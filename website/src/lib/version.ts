import packageJson from '../../package.json'

/**
 * Get the application version from package.json
 */
export function getAppVersion(): string {
  return packageJson.version || '0.0.0'
}

/**
 * Get the build timestamp (set at build time via environment variable)
 */
export function getBuildTimestamp(): string | null {
  return process.env.NEXT_PUBLIC_BUILD_TIME || null
}

/**
 * Get the git commit hash (set at build time via environment variable)
 */
export function getBuildCommit(): string | null {
  return process.env.NEXT_PUBLIC_BUILD_COMMIT || null
}

/**
 * Get formatted version string for display
 */
export function getVersionString(): string {
  const version = getAppVersion()
  const timestamp = getBuildTimestamp()
  const commit = getBuildCommit()
  
  let versionString = `v${version}`
  
  if (commit) {
    versionString += ` (${commit.substring(0, 7)})`
  }
  
  if (timestamp) {
    const date = new Date(timestamp)
    versionString += ` • Built ${date.toLocaleDateString()}`
  }
  
  return versionString
}

