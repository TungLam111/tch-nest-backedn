#!/bin/bash

MIGRATE_NAME=$1
# Source directory where the migration files are located
SOURCE_DIR="./"

# Destination directory where you want to copy the migration files
DESTINATION_DIR="./src/core/config/migrations"

for file in $(find "$SOURCE_DIR" -type f -name "*-$MIGRATE_NAME*.ts"); do
    # Move each file to the destination directory
    mv "$file" "$DESTINATION_DIR"
    echo "Moved: $file to $DESTINATION_DIR"
done

