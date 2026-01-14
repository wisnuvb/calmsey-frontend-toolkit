# ✅ Publish Checklist

## Current Setup Status

✅ **npm Username**: `wisnuvb`  
✅ **npm Profile**: https://www.npmjs.com/~wisnuvb  
✅ **Package Name**: `@wisnuvb/frontend-toolkit`  
✅ **GitHub Repo**: https://github.com/wisnuvb/calmsey-frontend-toolkit  
✅ **Repository Field**: Added in package.json  
✅ **License**: MIT  
✅ **Author**: Configured

## Pre-Publish Checklist

### 1. Verify Package Configuration

- [x] Package name matches npm username: `@wisnuvb/frontend-toolkit`
- [x] Version is set: `1.0.0`
- [x] Repository field points to GitHub
- [x] License is specified: `MIT`
- [x] Author information is complete
- [x] Description is clear
- [x] Keywords are relevant

### 2. Test Locally (Recommended)

```bash
# Make bin executable
chmod +x bin/create-app.js

# Test the CLI script locally
node bin/create-app.js test-app --skip-install

# Check what will be published
npm pack --dry-run
```

### 3. Verify Files to Publish

Check `.npmignore` and `files` field in `package.json`:

- ✅ Only necessary files included
- ✅ No sensitive data (`.env.local`, etc.)
- ✅ No build artifacts (`.next/`, `node_modules/`, etc.)
- ✅ Documentation included

### 4. Login to npm

```bash
# Check if already logged in
npm whoami

# If not logged in, login
npm login

# Verify you're logged in as wisnuvb
npm whoami
# Should output: wisnuvb
```

### 5. Check Package Availability

```bash
# Check if package name is available
npm search @wisnuvb/frontend-toolkit

# Or visit: https://www.npmjs.com/package/@wisnuvb/frontend-toolkit
```

## Publish Steps

### Step 1: Final Verification

```bash
# Check package.json
cat package.json | grep -A 5 '"name"'

# Verify bin file is executable
ls -la bin/create-app.js

# Dry run to see what will be published
npm pack --dry-run
```

### Step 2: Publish

```bash
# For scoped packages, use --access public
npm publish --access public
```

**Expected Output:**

```
npm notice Publishing to https://registry.npmjs.org/
+ @wisnuvb/frontend-toolkit@1.0.0
```

### Step 3: Verify Publication

1. **Check npm website**:
   - Visit: https://www.npmjs.com/package/@wisnuvb/frontend-toolkit
   - Should show your package page

2. **Check your profile**:
   - Visit: https://www.npmjs.com/~wisnuvb
   - Package should appear in your packages list

3. **Test installation**:
   ```bash
   cd /tmp
   npx @wisnuvb/frontend-toolkit test-install
   cd test-install
   npm run dev
   ```

## Post-Publish

### Update README (if needed)

Add installation instructions to README.md:

````markdown
## Quick Start

```bash
npx @wisnuvb/frontend-toolkit my-app
cd my-app
npm run dev
```
````

````

### Share Your Package

- Add to GitHub README
- Share on social media
- Add to package discovery sites

## Troubleshooting

### Error: "You must verify your email"
- Check your email and verify it
- Visit: https://www.npmjs.com/settings/wisnuvb/profile

### Error: "Package name already exists"
- Check: https://www.npmjs.com/package/@wisnuvb/frontend-toolkit
- If exists, update version or choose different name

### Error: "Permission denied"
- Make sure you're logged in: `npm whoami`
- Should output: `wisnuvb`

### Error: "You do not have permission to publish"
- For scoped packages, make sure you use `--access public`
- Or check organization permissions if using org scope

## Version Updates

When updating the package:

1. Update version in `package.json`:
   ```json
   "version": "1.0.1"  // patch
   "version": "1.1.0"  // minor
   "version": "2.0.0"  // major
````

2. Publish again:
   ```bash
   npm publish --access public
   ```

## Links

- **npm Profile**: https://www.npmjs.com/~wisnuvb
- **Package Page** (after publish): https://www.npmjs.com/package/@wisnuvb/frontend-toolkit
- **GitHub Repo**: https://github.com/wisnuvb/calmsey-frontend-toolkit

## Ready to Publish! 🚀

Your setup is complete and ready. Just run:

```bash
npm publish --access public
```
