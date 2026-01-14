# Publishing to npm

This guide will help you publish this package to npm so users can install it via `npx`.

## Prerequisites

1. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **Login to npm**: Run `npm login` in your terminal
3. **Unique package name**: Update the package name in `package.json` if needed

## Step 1: Update Package Name

The current package name is `@calmsey/frontend-toolkit`. You have two options:

### Option A: Use Scoped Package (Recommended)
```json
"name": "@your-username/frontend-toolkit"
```

### Option B: Use Unscoped Package
```json
"name": "frontend-toolkit"
```

**Note**: If using scoped package, make sure the scope matches your npm username/organization.

## Step 2: Verify Package Configuration

Check `package.json`:
- ✅ `name` - Unique package name
- ✅ `version` - Semantic version (start with 1.0.0)
- ✅ `bin` - CLI executable path
- ✅ `files` - Files to include in package
- ✅ `description` - Clear description
- ✅ `keywords` - Searchable keywords

## Step 3: Test Locally (Optional)

Before publishing, you can test locally:

```bash
# Link the package locally
npm link

# Test in another directory
cd /tmp
npx @your-username/frontend-toolkit test-app
```

## Step 4: Build & Publish

```bash
# Make sure bin file is executable
chmod +x bin/create-app.js

# Dry run (check what will be published)
npm pack --dry-run

# Publish to npm
npm publish

# For scoped packages (public)
npm publish --access public
```

## Step 5: Verify Publication

1. Visit `https://www.npmjs.com/package/@your-username/frontend-toolkit`
2. Check that all files are included
3. Test installation:
   ```bash
   npx @your-username/frontend-toolkit test-app
   ```

## Updating the Package

When you make changes:

1. Update version in `package.json`:
   ```json
   "version": "1.0.1"  // patch
   "version": "1.1.0"  // minor
   "version": "2.0.0"  // major
   ```

2. Publish again:
   ```bash
   npm publish
   ```

## Package Name Best Practices

- **Scoped packages**: `@username/package-name` (recommended for personal packages)
- **Unscoped packages**: `package-name` (must be globally unique)
- Check availability: `npm search package-name` or visit npmjs.com

## Troubleshooting

### Error: "Package name already exists"
- Choose a different name
- Use scoped package: `@your-username/package-name`

### Error: "You must verify your email"
- Check your email and verify it
- Run `npm login` again

### Error: "Permission denied"
- Make sure you're logged in: `npm whoami`
- For scoped packages, check organization permissions

### Files not included in package
- Check `.npmignore` file
- Verify `files` field in `package.json`
- Run `npm pack --dry-run` to see what will be included

## Example: Complete Publish Workflow

```bash
# 1. Login to npm
npm login

# 2. Update version (if needed)
# Edit package.json: "version": "1.0.0"

# 3. Make bin executable
chmod +x bin/create-app.js

# 4. Dry run
npm pack --dry-run

# 5. Publish
npm publish --access public

# 6. Test
cd /tmp
npx @your-username/frontend-toolkit my-test-app
```

## After Publishing

Update your README.md to include installation instructions:

```markdown
## Quick Start

```bash
npx @your-username/frontend-toolkit my-app
cd my-app
npm run dev
```
```

## Versioning

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features (backward compatible)
- **PATCH** (0.0.1): Bug fixes

## Unpublishing (if needed)

⚠️ **Warning**: Only unpublish within 72 hours of publishing

```bash
npm unpublish @your-username/frontend-toolkit
```

For packages older than 72 hours, contact npm support.
