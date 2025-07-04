import { defineConfig } from 'cypress';
import fs from 'fs';

// Helper to load env from a custom JSON file
function loadEnvConfig(envName: string) {
  const path = `./cypress.${envName}.env.json`;
  if (fs.existsSync(path)) {
    const envConfig = require(path);
    return envConfig.env || {};
  }
  return {};
}

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    fixturesFolder: 'cypress/fixtures',
    numTestsKeptInMemory: 0,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Load env from JSON file like cypress.staging.env.json
      const configFile = config.env.configFile || 'staging';
      const fileEnv = loadEnvConfig(configFile);

      // Merge file env vars into Cypress config
      config.env = {
        ...config.env,
        ...fileEnv,
      };

      // Set baseUrl directly (important!)
      config.baseUrl = fileEnv.baseurl;

      return config;
    },
    // Optional fallback in case setupNodeEvents isn't triggered
    env: loadEnvConfig(process.env.configFile || 'staging'),
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx}',
    supportFile: 'cypress/support/index.ts',
  },
  experimentalMemoryManagement: true,
  watchForFileChanges: false,
  video: true,
});
