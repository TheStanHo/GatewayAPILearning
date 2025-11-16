const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Get build timestamp
const buildTime = new Date().toISOString()

// Try to get git commit hash
let commit = ''
try {
  commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()
} catch (e) {
  // Git not available or not a git repo
  console.warn('Could not get git commit hash:', e.message)
}

// Set environment variables for Next.js
process.env.NEXT_PUBLIC_BUILD_TIME = buildTime
if (commit) {
  process.env.NEXT_PUBLIC_BUILD_COMMIT = commit
}

console.log('Build info:')
console.log(`  Time: ${buildTime}`)
if (commit) {
  console.log(`  Commit: ${commit.substring(0, 7)}`)
}

// Run Next.js build
try {
  execSync('next build', { stdio: 'inherit', env: process.env })
} catch (error) {
  process.exit(1)
}

