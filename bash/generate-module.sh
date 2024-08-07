#!/bin/bash

# Read the module name from the command-line argument
MODULE_NAME=$1

# Check if the module name is provided
if [ -z "$MODULE_NAME" ]; then
  echo "Error: Please provide a module name."
  exit 1
fi

cd src/modules
# Create the module using Nest CLI
nest generate module $MODULE_NAME

# Generate a controller within the module
nest generate controller $MODULE_NAME

# Generate a service within the module
nest generate service $MODULE_NAME


cd $MODULE_NAME || exit 1

mkdir interfaces
mkdir entities
mkdir dtos

# Display a success message
echo "Module '$MODULE_NAME' created successfully."

cd ../../
