export const eslintIgnore = [
    // Node modules
    "node_modules/",
    "apps/frontend/node_modules/",
    "apps/backend/node_modules/",
  
    // Build outputs
    ".turbo/",
    "apps/frontend/.next/",
    "apps/backend/dist/",
    "apps/frontend/out/",
    "apps/backend/build/",
  
    // Environment files
    "apps/frontend/.env",
    "apps/backend/.env",
    "apps/frontend/.env.example",
    "apps/backend/.env.example",
  
    // TypeScript declaration files
    "**/*.d.ts",
  
    // Lock files
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
  
    // IDE/editor-specific files
    ".vscode/",
    ".idea/",
    "*.iml",
  
    // Logs
    "logs/",
    "*.log",
    "npm-debug.log*",
    "yarn-debug.log*",
    "yarn-error.log*",
  
    // Temporary files
    ".DS_Store",
    "Thumbs.db",
    "*.tmp",
    "*.swp",
  
    // Test coverage outputs
    "coverage/",
    "apps/frontend/coverage/",
    "apps/backend/coverage/",
];