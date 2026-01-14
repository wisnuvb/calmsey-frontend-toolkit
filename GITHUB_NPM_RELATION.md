# GitHub & npm Package Relationship

## 📦 Nama Paket vs Nama Repositori

**Not necessarily the same**, but consistency is recommended for ease of use.

### Current Setup

- **GitHub Repository**: `wisnuvb/calmsey-frontend-toolkit`
- **npm Package Name**: `@wisnuvb/frontend-toolkit`
- **Repository Link**: Added in `package.json` → `repository` field

### Why They're Different?

1. **Package Name**: Must be unique in the npm registry

- Scoped: `@username/package-name` (recommended)
- Unscoped: `package-name` (must be globally unique)

2. **Repository Name**: Can be any name on GitHub

- Can be any name
- Doesn't have to be globally unique

### Best Practices

✅ **Good**:

- Package: `@wisnuvb/frontend-toolkit`
- Repo: `wisnuvb/calmsey-frontend-toolkit`
- **Repository field** in package.json connects the two

✅ **Also Good** (if you want them to match):

- Package: `@wisnuvb/calmsey-frontend-toolkit`
- Repo: `wisnuvb/calmsey-frontend-toolkit`

### What's in package.json?

```json
{
  "name": "@wisnuvb/frontend-toolkit",
  "repository": {
    "type": "git",
    "url": "https://github.com/wisnuvb/calmsey-frontend-toolkit.git"
  },
  "homepage": "https://github.com/wisnuvb/calmsey-frontend-toolkit#readme",
  "bugs": {
    "url": "https://github.com/wisnuvb/calmsey-frontend-toolkit/issues"
  }
}
```

### Benefits of Adding Repository Field

1. **npm Website**: Will show a link to GitHub
2. **npm CLI**: The `npm repo` command will open GitHub
3. **Discoverability**: Users can go directly to the source code
4. **Trust**: Indicates that the package has reviewable source code

### How It Works

1. **User installs via npx**:

   ```bash
   npx @wisnuvb/frontend-toolkit my-app
   ```

2. **User checks package info**:

   ```bash
   npm info @wisnuvb/frontend-toolkit
   # Shows repository link
   ```

3. **User visits npm page**:
   - https://www.npmjs.com/package/@wisnuvb/frontend-toolkit
   - Will show GitHub repository link

4. **User can visit GitHub**:
   - https://github.com/wisnuvb/calmsey-frontend-toolkit

### Summary

✅ **Package name** (`@wisnuvb/frontend-toolkit`) = for npm
✅ **Repository name** (`calmsey-frontend-toolkit`) = for GitHub
✅ **Repository field** = linking the two

**It doesn't matter if they're different**, as long as there's a `repository` field in package.json for the link!
