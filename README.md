# Firebase Tools

[🇯🇵 日本語](./README.ja.md)

Firebase/Firestore management tools

## Setup

```bash
# Install dependencies
npm install

# Deploy to system
./deploy.sh
```

Installation method: `npm link` (global symbolic link)

**Note**: Make sure npm's global bin directory is in your PATH.

## Usage

### browse-firestore

Browse any Firestore collection

```bash
# Basic usage
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json \
  browse-firestore [collection] [limit]

# Example: Fetch 10 products
GOOGLE_APPLICATION_CREDENTIALS=~/.firebase_keys/lipass-dev-*.json \
  browse-firestore products 10

# Example: Fetch metadata collection
browse-firestore metadata 1

# Example: Fetch 5 insurers
browse-firestore insurers 5

# Show help
browse-firestore --help
```

**Arguments:**
- `collection` - Collection path (default: products)
- `limit` - Number of documents to fetch (default: 10)

## Environment Variables

### GOOGLE_APPLICATION_CREDENTIALS

Specify the path to Firebase service account key file.

**Example (using direnv):**
```bash
# .envrc
export GOOGLE_APPLICATION_CREDENTIALS="${HOME}/.firebase_keys/lipass-dev-firebase-adminsdk-*.json"
```

**Command-line specification:**
```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json browse-firestore products
```

## Development

This tool is completely generic and can be used with any Firebase project.
To reference a different project, specify the corresponding service account key.

### Directory Structure

```
~/03_Projects/900_Tools/01_Firebase/
├── src/                    # Source code (development)
│   └── browse-firestore.js
├── node_modules/           # Dependencies
├── deploy.sh               # System deployment script
├── package.json
├── README.md
├── README.ja.md
└── .gitignore
```

### Release Process

Version bumping and deployment are automated:

```bash
# Patch version bump (1.0.0 → 1.0.1)
npm version patch -m "Release v%s"

# Minor version bump (1.0.0 → 1.1.0)
npm version minor -m "Release v%s"

# Major version bump (1.0.0 → 2.0.0)
npm version major -m "Release v%s"
```

**Automated steps:**
1. Update version in package.json
2. Create git commit
3. Create git tag
4. Push to remote repository (commit + tag)
5. Deploy via `npm link`

## License

MIT
