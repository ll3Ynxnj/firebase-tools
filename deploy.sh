#!/bin/bash
# deploy.sh - Install Firebase tools to system using npm link

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Deploying Firebase tools using npm link..."
echo "Project directory: ${PROJECT_DIR}"
echo ""

cd "${PROJECT_DIR}"

# Unlink if already linked
npm unlink -g 2>/dev/null || true

# Link globally
echo "Creating global npm link..."
npm link

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")

echo ""
echo "✅ Deployment complete!"
echo "   Version: ${VERSION}"
echo "   Installed via: npm link"
echo ""
echo "Command available: browse-firestore"
echo ""

# Test if command is available
if command -v browse-firestore &> /dev/null; then
    echo "✓ browse-firestore is in PATH and ready to use"
else
    echo "⚠ Warning: browse-firestore not found in PATH"
    echo "  You may need to add npm's global bin directory to your PATH"
    echo "  Run: npm bin -g"
fi
