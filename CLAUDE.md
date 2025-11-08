# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Firebase Tools is a collection of CLI utilities for managing and browsing Firebase/Firestore data. This is a generic, project-agnostic toolset that can be used with any Firebase project by specifying the appropriate service account credentials.

**Key Features:**
- Browse any Firestore collection with flexible filtering
- Generic implementation - works with any Firebase project
- Automated release process with version management
- Multi-language documentation (English/Japanese)

## Development Commands

### Installation and Setup

```bash
# Install dependencies
npm install

# Deploy to system (uses npm link)
./deploy.sh

# Test the installed command
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json \
  browse-firestore metadata 1
```

### Testing

```bash
# Test browse-firestore locally (without installation)
cd ~/03_Projects/900_Tools/01_Firebase
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json \
  node src/browse-firestore.js products 10

# Test with different collections
node src/browse-firestore.js metadata 1
node src/browse-firestore.js insurers 5
```

## Code Architecture

### Project Structure

```
~/03_Projects/900_Tools/01_Firebase/
├── src/                    # Source code
│   └── browse-firestore.js # Main CLI tool
├── deploy.sh               # Deployment script (npm link)
├── package.json            # npm configuration with postversion hooks
├── README.md               # English documentation
├── README.ja.md            # Japanese documentation
└── .gitignore
```

### Key Design Principles

1. **Generic and Reusable**: No project-specific dependencies
2. **Environment-based Configuration**: Use GOOGLE_APPLICATION_CREDENTIALS
3. **Simple Dependencies**: Minimal npm packages (firebase-admin only)
4. **Self-contained**: Each tool is a standalone executable script

## Code Style Guidelines

### Language Rules

**IMPORTANT**: This is a public, open-source project.

- **Source Code**: All comments must be in English
- **Documentation**: Provide both English (README.md) and Japanese (README.ja.md) versions
- **Commit Messages**: English only
- **Variable Names**: English only

### Code Formatting

- Use 2-space indentation
- Use single quotes for strings (unless template literals are needed)
- Add JSDoc comments for functions
- Keep functions small and focused

### Example:

```javascript
// Good: English comments
// Parse command line arguments
const args = process.argv.slice(2);

// Bad: Japanese comments (avoid in source code)
// コマンドライン引数の処理
const args = process.argv.slice(2);
```

## Release Process

Version management and deployment are fully automated using npm version hooks.

### Releasing a New Version

```bash
cd ~/03_Projects/900_Tools/01_Firebase

# Patch release (1.0.0 → 1.0.1) - bug fixes
npm version patch -m "Release v%s"

# Minor release (1.0.0 → 1.1.0) - new features
npm version minor -m "Release v%s"

# Major release (1.0.0 → 2.0.0) - breaking changes
npm version major -m "Release v%s"
```

**Automated Steps** (via `postversion` hook in package.json):
1. Update version in package.json
2. Create git commit
3. Create git tag (e.g., v1.0.1)
4. Push commit and tags to GitHub
5. Deploy to system via `./deploy.sh` (npm link)

### Manual Deployment Only

If you only want to deploy without versioning:

```bash
./deploy.sh
```

## Environment Variables

### GOOGLE_APPLICATION_CREDENTIALS

Path to Firebase service account key file. Required for all Firebase operations.

**Setup with direnv** (recommended):
```bash
# .envrc in project directory
export GOOGLE_APPLICATION_CREDENTIALS="${HOME}/.firebase_keys/your-project-key.json"
```

**One-time usage**:
```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json browse-firestore products
```

## Git Workflow

### Branch Strategy

- `main` - Production-ready code
- Feature branches - Short-lived branches for development

### Commit Message Guidelines

Follow conventional commit format:

```
<type>: <description>

[optional body]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add support for subcollection browsing
fix: handle Timestamp conversion errors
docs: update README with new examples
```

## Adding New Tools

When adding new Firebase tools to this project:

1. **Create the tool in `src/` directory**
   ```bash
   touch src/new-tool.js
   chmod +x src/new-tool.js
   ```

2. **Add shebang and basic structure**
   ```javascript
   #!/usr/bin/env node
   // new-tool.js - Brief description
   const admin = require('firebase-admin');
   // ... implementation
   ```

3. **Update package.json bin section**
   ```json
   {
     "bin": {
       "browse-firestore": "./src/browse-firestore.js",
       "new-tool": "./src/new-tool.js"
     }
   }
   ```

4. **Update deploy.sh** (if needed)

5. **Add documentation to README.md and README.ja.md**

6. **Test locally before committing**
   ```bash
   node src/new-tool.js --help
   ./deploy.sh
   new-tool --help
   ```

## Documentation Guidelines

### Multi-language Support

- **Always update both** README.md (English) and README.ja.md (Japanese)
- Keep structure and content consistent between versions
- Add language switcher links at the top of each file:
  ```markdown
  # Firebase Tools

  [🇯🇵 日本語](./README.ja.md)
  ```

### Documentation Structure

Each README should include:
1. Project description
2. Setup instructions
3. Usage examples
4. Environment variables
5. Development guide (directory structure, release process)
6. License

## Common Tasks

### Testing with Different Firebase Projects

```bash
# Development environment
export GOOGLE_APPLICATION_CREDENTIALS="${HOME}/.firebase_keys/project-dev.json"
browse-firestore products 10

# Production environment
export GOOGLE_APPLICATION_CREDENTIALS="${HOME}/.firebase_keys/project-prod.json"
browse-firestore products 10
```

### Debugging

```bash
# Run with Node.js debugger
node --inspect src/browse-firestore.js products 10

# Add debug output (in code)
console.error('Debug:', variableName);
```

### Uninstalling

```bash
# Unlink from system
npm unlink -g

# Or manually remove
rm $(which browse-firestore)
```

## Dependencies

This project uses minimal dependencies:

- `firebase-admin`: Official Firebase Admin SDK
- No development dependencies (keeping it simple)

**Adding new dependencies:**
- Only add if absolutely necessary
- Prefer standard Node.js modules
- Document the reason in commit message

## Security Notes

- **Never commit service account keys** (.gitignore already configured)
- Service account keys should be stored in `~/.firebase_keys/` (outside repository)
- Use environment variables for sensitive data
- This tool is read-only by design (browse only, no write operations)

## License

MIT License - See LICENSE file for details

## Contributing

This is a personal utility project, but contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes (following code style guidelines)
4. Update both README.md and README.ja.md
5. Test thoroughly
6. Submit a pull request

## Troubleshooting

### "Cannot find module 'firebase-admin'"

```bash
cd ~/03_Projects/900_Tools/01_Firebase
npm install
./deploy.sh
```

### "Command not found: browse-firestore"

Check if npm global bin directory is in PATH:
```bash
npm bin -g
echo $PATH
```

Add to PATH if needed (in ~/.bashrc or ~/.zshrc):
```bash
export PATH="$(npm bin -g):$PATH"
```

### "GOOGLE_APPLICATION_CREDENTIALS not set"

Set the environment variable:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
```

Or use direnv for automatic loading (recommended).
