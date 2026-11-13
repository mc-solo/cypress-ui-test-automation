import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // No baseUrl: specs use absolute URLs to public demo sites, so each
    // spec is explicit about the system under test.
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    setupNodeEvents(_on, _config) {
      // No plugins required for this sample. Keep the hook so reporters
      // or task wiring can be added without restructuring the config.
    },
  },
});
