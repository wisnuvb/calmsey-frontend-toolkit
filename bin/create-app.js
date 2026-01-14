#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TEMPLATE_DIR = path.join(__dirname, '..');
const IGNORE_FILES = [
  'node_modules',
  '.next',
  'out',
  '.git',
  '.env.local',
  '.env',
  'package-lock.json',
  'yarn.lock',
  '.DS_Store',
  '*.log',
  'bin',
  '.vercel',
];

function copyTemplate(targetDir, projectName) {
  console.log(`\n📦 Creating project: ${projectName}...\n`);

  // Create target directory
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy files
  function copyRecursive(src, dest) {
    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
      const dirName = path.basename(src);
      
      // Skip ignored directories
      if (IGNORE_FILES.includes(dirName)) {
        return;
      }

      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      const files = fs.readdirSync(src);
      files.forEach((file) => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        // Skip ignored files
        if (IGNORE_FILES.some(ignore => file.includes(ignore))) {
          return;
        }

        copyRecursive(srcPath, destPath);
      });
    } else {
      // Skip bin directory files
      if (src.includes(path.join(TEMPLATE_DIR, 'bin'))) {
        return;
      }

      fs.copyFileSync(src, dest);
    }
  }

  // Copy template files
  const items = fs.readdirSync(TEMPLATE_DIR);
  items.forEach((item) => {
    if (IGNORE_FILES.includes(item)) {
      return;
    }

    const srcPath = path.join(TEMPLATE_DIR, item);
    const destPath = path.join(targetDir, item);

    // Skip bin directory
    if (item === 'bin') {
      return;
    }

    copyRecursive(srcPath, destPath);
  });

  // Update package.json with project name
  const packageJsonPath = path.join(targetDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    packageJson.version = '0.1.0';
    delete packageJson.bin;
    delete packageJson.files;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  }

  console.log('✅ Template files copied successfully!\n');
}

function generateEnvFile(targetDir) {
  const envTemplate = `# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Database (if needed)
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Optional: Other API Keys
# NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
`;

  const envPath = path.join(targetDir, '.env.local');
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ Created .env.local file\n');
  }
}

function installDependencies(targetDir) {
  console.log('📦 Installing dependencies...\n');
  try {
    execSync('npm install', {
      cwd: targetDir,
      stdio: 'inherit',
    });
    console.log('\n✅ Dependencies installed successfully!\n');
  } catch (error) {
    console.error('\n❌ Error installing dependencies. Please run "npm install" manually.\n');
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🚀 Create Next.js Frontend Toolset

Usage:
  npx @your-scope/frontend-toolset <project-name>
  npx @your-scope/frontend-toolset my-app

Options:
  --skip-install    Skip installing dependencies
  --help            Show this help message

Example:
  npx @your-scope/frontend-toolset my-awesome-app
`);
    process.exit(1);
  }

  if (args[0] === '--help' || args[0] === '-h') {
    console.log(`
🚀 Create Next.js Frontend Toolset

A modern Next.js boilerplate with:
- Next.js 16 (App Router)
- TypeScript
- TanStack Query
- NextAuth.js
- Orval (API code generation)
- Shadcn UI
- Tailwind CSS

Usage:
  npx @your-scope/frontend-toolset <project-name>

Example:
  npx @your-scope/frontend-toolset my-app
`);
    process.exit(0);
  }

  const projectName = args[0];
  const skipInstall = args.includes('--skip-install');
  const targetDir = path.resolve(process.cwd(), projectName);

  // Check if directory already exists
  if (fs.existsSync(targetDir)) {
    console.error(`\n❌ Error: Directory "${projectName}" already exists.\n`);
    process.exit(1);
  }

  try {
    // Copy template
    copyTemplate(targetDir, projectName);

    // Generate .env.local
    generateEnvFile(targetDir);

    // Install dependencies
    if (!skipInstall) {
      installDependencies(targetDir);
    } else {
      console.log('⏭️  Skipping dependency installation\n');
    }

    // Success message
    console.log(`
🎉 Project created successfully!

Next steps:
  1. cd ${projectName}
  2. ${skipInstall ? 'npm install' : ''}${skipInstall ? '\n  3. ' : ''}Generate NEXTAUTH_SECRET:
     openssl rand -base64 32
  3. ${skipInstall ? '4. ' : ''}Update .env.local with your NEXTAUTH_SECRET
  4. ${skipInstall ? '5. ' : ''}Configure Orval in orval.config.js
  5. ${skipInstall ? '6. ' : ''}Run: npm run dev

📚 Documentation:
  - README.md - Main documentation
  - GETTING_STARTED.md - Setup guide
  - API_ARCHITECTURE.md - API usage guide

Happy coding! 🚀
`);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

main();
