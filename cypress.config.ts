import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env' });

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter', // ✅ This stays
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
      require('cypress-mochawesome-reporter/plugin')(on); // ✅ plugin is now correctly aligned

      const configFile = config.env.configFile || 'staging';
      const fileEnv = loadEnvConfig(configFile);

      config.env = {
        ...config.env,
        ...fileEnv,
      };

      return config;
    },
    env: {
      username: process.env.username,
      password: process.env.password,
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx}',
    supportFile: 'cypress/support/index.ts',
  },
  experimentalMemoryManagement: true,
  watchForFileChanges: false,
  video: true,
});

function loadEnvConfig(envName: string) {
  const path = `./cypress.${envName}.env.json`;
  if (fs.existsSync(path)) {
    const envConfig = require(path);
    return envConfig.env || {};
  }
  return {};
}
