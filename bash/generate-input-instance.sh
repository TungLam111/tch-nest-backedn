#!/bin/bash

filename="bash/entities.yaml"
module_name=""
current_entity=""
declare -a fields
declare -a types

declare -a referencedColumnNames 
declare -a relations 
declare -a entityNames

# Function to convert PascalCase to camelCase
to_camel_case() {
    local pascal_case_string="$1"
    if [[ -z "$pascal_case_string" ]]; then
        echo "$pascal_case_string" # Return as is if the string is empty
    else
        # Convert the first character to lowercase and concatenate with the rest of the string
        echo "$(tr '[:upper:]' '[:lower:]' <<< "${pascal_case_string:0:1}")${pascal_case_string:1}"
    fi
}

list_to_set() {
    local list=("$@")  # Capture all arguments as an array
    local unique_list=() # Array to store unique elements

    # Iterate over the list and filter out "null" and empty strings
    for item in "${list[@]}"; do
        if [[ -n "$item" && "$item" != "null" ]]; then
            unique_list+=("$item")
        fi
    done

    # Sort and remove duplicates
    unique_list=($(printf "%s\n" "${unique_list[@]}" | sort -u))

    echo "${unique_list[@]}"
}

# Function to convert a list to a comma-separated string of unique elements
list_to_comma_separated_string() {
    local list=("$@")  # Capture all arguments as an array
    local unique_list=() # Array to store unique elements
    local set_string=""

    # Iterate over the list and filter out "null" and empty strings
    for item in "${list[@]}"; do
        if [[ -n "$item" && "$item" != "null" ]]; then
            unique_list+=("$item")
        fi
    done

    # Sort and remove duplicates
    unique_list=($(printf "%s\n" "${unique_list[@]}" | sort -u))

    # Construct a comma-separated string
    for element in "${unique_list[@]}"; do
        if [[ -n "$set_string" ]]; then
            set_string+=", "
        fi
        set_string+="$element"
    done

    if [[ -n "${set_string}" && "${set_string}" != "" ]]; then
        set_string+=", JoinColumn"
    fi
    
    echo "$set_string"  # Output the result
}

entity_to_name_file() {
    local entity_name="$1"
    # Convert PascalCase to kebab-case
    local filename=$(echo "$entity_name" | sed 's/\([a-z0-9]\)\([A-Z]\)/\1-\2/g' | tr '[:upper:]' '[:lower:]')
    echo "$filename"
}

# Function to write the TypeScript class and functions to file
write_to_file() {
    entity_file="src/modules/${module_name}/entities/${module_name}.entity.ts"
    
    # Check if the file exists
    if [[ -f "$entity_file" ]]; then
        # Clear the content of the file using redirection
        > "$entity_file"
        echo "File '$entity_file' has been cleared."
    else
        echo "File '$entity_file' does not exist."
    fi

    # Write imports
    echo "import { AbstractEntity } from 'src/helper/common/common_entity';" >> "$entity_file"
    echo "import { Column, Entity, PrimaryGeneratedColumn," >> "$entity_file"

    comma_separated_string=$(list_to_comma_separated_string "${relations[@]}")

    echo " ${comma_separated_string} } from 'typeorm';" >> "$entity_file"

    string_entity=$(list_to_set "${entityNames[@]}")
    read -ra unique_entityNames <<< "$string_entity"
    if [[ ! -z "${unique_entityNames[@]}" ]]; then
        for i in "${!unique_entityNames[@]}"; do 
            entity=$(entity_to_name_file "${unique_entityNames[$i]}")
            echo "import { ${unique_entityNames[$i]} } from 'src/modules/${entity}/entities/${entity}.entity';" >> "$entity_file"
        done 
    fi 

    echo "" >> "$entity_file"

    echo "@Entity()" >> "$entity_file"
    echo "export class $current_entity extends AbstractEntity {" >> "$entity_file"
    echo "  @PrimaryGeneratedColumn('uuid')" >> "$entity_file"
    echo "  id: string;" >> "$entity_file"
    echo "" >> "$entity_file"

    for i in "${!fields[@]}"; do
        IFS='|' read -ra type_parts <<< "${types[$i]}"

        # Trim spaces from each part
        trimmed_parts=()
        for part in "${type_parts[@]}"; do
            # Use xargs to trim leading and trailing whitespace
            trimmed_parts+=("$(echo -n "$part" | xargs)")
        done
        
        if [[ "${relations[$i]}" =~ "OneToMany" ]]; then 
            camel_case=$(to_camel_case "${entityNames[$i]}")
            echo "  @${relations[$i]}(() => ${entityNames[$i]}, ${camel_case} => ${camel_case}.${referencedColumnNames[$i]})"  >> "$entity_file"
            echo "  ${fields[$i]}: ${trimmed_parts[0]};" >> "$entity_file"
            echo "" >> "$entity_file"
        else 
            # Check if 'nullable' is in the trimmed parts
            if [[ " ${trimmed_parts[@]} " =~ " nullable " ]]; then
                # If 'nullable' is found, set the column as nullable
                echo "  @Column({ nullable: true })" >> "$entity_file"
            else
                # Otherwise, use the normal column definition
                echo "  @Column()" >> "$entity_file"
            fi
            echo "  ${fields[$i]}: ${trimmed_parts[0]};" >> "$entity_file"
            echo "" >> "$entity_file"

            # Check if names[$i] is not null, not empty, and not the string "null"
            if [[ -n "${entityNames[$i]}" && "${entityNames[$i]}" != "null" ]]; then
                echo "  @${relations[$i]}(() => ${entityNames[$i]})" >> "$entity_file"
                echo "  @JoinColumn({ name: '${fields[$i]}', referencedColumnName: '${referencedColumnNames[$i]}'})" >> "$entity_file"
                
                camel_case=$(to_camel_case "${entityNames[$i]}")

                echo "  ${camel_case}: ${entityNames[$i]};" >> "$entity_file"
                echo "" >> "$entity_file"
            fi
        fi
    done

    echo "}" >> "$entity_file"

    # Append CreateInput and UpdateInput functions
    createInput=""
    for i in "${!fields[@]}"; do
        # Split the current type by '|'
        IFS='|' read -ra type_parts <<< "${types[$i]}"
        
        # Trim spaces from each part and check if 'nullable' is present
        is_nullable=false
        primary_type=""
        
        for part in "${type_parts[@]}"; do
            # Trim leading and trailing whitespace using xargs
            trimmed_part="$(echo -n "$part" | xargs)"
            
            if [[ "$trimmed_part" == "nullable" ]]; then
                is_nullable=true
            else
                primary_type="$trimmed_part"
            fi
        done
        
        # Construct the input field definition
        if $is_nullable; then
            createInput+="${fields[$i]}: ${primary_type} | null, "
        else
            createInput+="${fields[$i]}: ${primary_type}, "
        fi
    done

    # Remove the trailing comma and space
    createInput="${createInput%, }"  # Trim the last comma and space

    # Wrap the createInput in curly braces
    createInput="{
        $createInput
    }"

    updateInput=""
    for i in "${!fields[@]}"; do
        # Split the current type by '|'
        IFS='|' read -ra type_parts <<< "${types[$i]}"
        
        # Trim spaces from each part and check if 'nullable' is present
        is_nullable=false
        primary_type=""
        
        for part in "${type_parts[@]}"; do
            # Trim leading and trailing whitespace using xargs
            trimmed_part="$(echo -n "$part" | xargs)"
            
            if [[ "$trimmed_part" == "nullable" ]]; then
                is_nullable=true
            else
                primary_type="$trimmed_part"
            fi
        done
        
        # Construct the input field definition
        if $is_nullable; then
            updateInput+="${fields[$i]}: ${primary_type} | null, "
        else
            updateInput+="${fields[$i]}: ${primary_type}, "
        fi
    done
    
    # Remove the trailing comma and space
    updateInput="${updateInput%, }"  # Trim the last comma and space

    # Wrap the updateInput in curly braces
    updateInput="{
        $updateInput
    }"

    echo "

export function ${current_entity}CreateInput(create${current_entity}Dto: $createInput): ${current_entity} {
  const createDto: ${current_entity} = new ${current_entity}();
  $(for f in "${fields[@]}"; do echo "  createDto.$f = create${current_entity}Dto.$f;"; done)
  return createDto;
}

export function ${current_entity}UpdateInput(current${current_entity}: ${current_entity}, update${current_entity}Dto: $updateInput): ${current_entity} {
  return {
    ...current${current_entity},
    $(for f in "${fields[@]}"; do echo "    $f: update${current_entity}Dto.$f,"; done)
  };
}
" >> "$entity_file"
}

# Read each line from the YAML file
while IFS= read -r line; do
    # Check for a new module block
    if [[ $line =~ ^[a-zA-Z-]+: ]]; then
        # Write to file when switching to a new module or at the end
        if [[ ! -z $current_entity ]]; then
            write_to_file
        fi
        module_name=$(echo "$line" | awk -F: '{print $1}' | xargs)
        current_entity=""
        fields=()
        types=()
        relations=()
        entityNames=()
        referencedColumnNames=()

    elif [[ $line =~ ^[[:space:]]+entity: ]]; then
        current_entity=$(echo "$line" | awk -F: '{print $2}' | xargs)
    elif [[ $line =~ ^[[:space:]]+[a-zA-Z] ]]; then
        # Read fields and their types, skipping "fields" line
        if [[ ! $line =~ ^[[:space:]]+fields: ]]; then
            if [[ $line =~ ^[[:space:]]+type: ]]; then 
                type=$(echo "$line" | awk -F: '{print $2}' | xargs)
                types+=("$type")
            elif [[ $line =~ ^[[:space:]]+entityName: ]]; then 
                entityName=$(echo "$line" | awk -F: '{print $2}' | xargs)
                entityNames+=("$entityName")                
            elif [[ $line =~ ^[[:space:]]+relation: ]]; then 
                relation=$(echo "$line" | awk -F: '{print $2}' | xargs)
                relations+=("$relation")
            elif [[ $line =~ ^[[:space:]]+referencedColumnName: ]]; then
                referencedColumnName=$(echo "$line" | awk -F: '{print $2}' | xargs)
                referencedColumnNames+=("$referencedColumnName")
            else
                field=$(echo "$line" | awk -F: '{print $1}' | xargs)
                fields+=("$field")
            fi
        fi
    fi
done < "$filename"

# Final write for the last entity
if [[ ! -z $current_entity ]]; then
    write_to_file
fi

echo "Entity files and functions have been generated."