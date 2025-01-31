const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, 'src/environments/environment.prod.ts');

const apiKey = process.env.FIREBASE_API_KEY;
const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
const databaseURL = process.env.FIREBASE_DATABASE_URL;
const projectId = process.env.FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.FIREBASE_APP_ID;

// Read the existing environment file
let envFileContent = fs.readFileSync(envFilePath, 'utf8');

// Replace the placeholders with actual values
envFileContent = envFileContent
  .replace(/YOUR_API_KEY_PLACEHOLDER/g, apiKey)
  .replace(/YOUR_AUTH_DOMAIN_PLACEHOLDER/g, authDomain)
  .replace(/YOUR_DATABASE_URL_PLACEHOLDER/g, databaseURL)
  .replace(/YOUR_PROJECT_ID_PLACEHOLDER/g, projectId)
  .replace(/YOUR_STORAGE_BUCKET_PLACEHOLDER/g, storageBucket)
  .replace(/YOUR_MESSAGING_SENDER_ID_PLACEHOLDER/g, messagingSenderId)
  .replace(/YOUR_APP_ID_PLACEHOLDER/g, appId);

// Write the updated content back to the environment file
fs.writeFileSync(envFilePath, envFileContent);
