#!/bin/bash
# Generate component documentation

echo "Generating component documentation..."

cd web

# Check if jsdoc is installed
if ! command -v jsdoc &> /dev/null; then
    echo "Installing jsdoc..."
    npm install -D jsdoc
fi

# Create jsdoc config
cat > jsdoc.json << 'EOF'
{
  "source": {
    "include": ["components/*.tsx"],
    "exclude": ["node_modules/"]
  },
  "opts": {
    "destination": "../docs/components/",
    "recurse": true
  },
  "plugins": ["plugins/markdown"]
}
EOF

# Generate docs
npx jsdoc -c jsdoc.json

cd ..

echo "Component documentation generated in docs/components/"
