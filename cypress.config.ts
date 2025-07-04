import { defineConfig } from 'cypress';
import fs from 'fs';

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
    reportDir: 'reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  experimentalMemoryManagement: true,
  watchForFileChanges: false,
  video: true,

  e2e: {
    fixturesFolder: 'cypress/fixtures',
    numTestsKeptInMemory: 0,
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx}',
    supportFile: 'cypress/support/index.ts',

    setupNodeEvents(on, config) {
      // 🔌 Setup reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      const configFile = config.env.configFile || 'staging';
      const fileEnv = loadEnvConfig(configFile);

      config.env = {
        ...fileEnv,
        ...config.env,
        baseurl: process.env.BASEURL || config.env.baseurl || 'http://3.8.242.61',
        username: process.env.USERNAME || config.env.username,
        password: process.env.PASSWORD || config.env.password,
      };

      return config;
    },
  },
});
