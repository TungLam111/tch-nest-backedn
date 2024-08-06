#!/bin/bash

filename="bash/entities.yaml"
module_name=""
current_entity=""
declare -a fields
declare -a types

# Function to write the TypeScript class and functions to file
write_to_file() {
    entity_file="src/modules/${module_name}/entities/${module_name}.entity.ts"
    # Write imports
    echo "import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';" > "$entity_file"
    echo "import { AbstractEntity } from 'src/helper/common/common_entity';" >> "$entity_file"
   
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
    elif [[ $line =~ ^[[:space:]]+entity: ]]; then
        current_entity=$(echo "$line" | awk -F: '{print $2}' | xargs)
    elif [[ $line =~ ^[[:space:]]+[a-zA-Z] ]]; then
        # Read fields and their types, skipping "fields" line
        if [[ ! $line =~ ^[[:space:]]+fields: ]]; then
            field=$(echo "$line" | awk -F: '{print $1}' | xargs)
            type=$(echo "$line" | awk -F: '{print $2}' | xargs)
            fields+=("$field")
            types+=("$type")
        fi
    fi
done < "$filename"

# Final write for the last entity
if [[ ! -z $current_entity ]]; then
    write_to_file
fi

echo "Entity files and functions have been generated."