#!/bin/bash
# Create a new component

if [ -z "$1" ]; then
    echo "Usage: ./create-component.sh ComponentName"
    exit 1
fi

COMPONENT_NAME=$1
COMPONENT_FILE="web/components/${COMPONENT_NAME}.tsx"

echo "Creating component: ${COMPONENT_FILE}"

cat > "${COMPONENT_FILE}" << EOF
import React from 'react'

interface Props {
  // Define props here
}

export default function ${COMPONENT_NAME}({ }: Props) {
  return (
    <div>
      {/* Component content */}
    </div>
  )
}
EOF

echo "Component created: ${COMPONENT_FILE}"
