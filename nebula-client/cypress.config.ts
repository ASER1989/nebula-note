import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "nebula-note",
  experimentalStudio: false,
  e2e: {
    baseUrl: "http://localhost:3107",
    excludeSpecPattern: ["**/**-examples/**","**/**-getting-started/**"],
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    chromeWebSecurity: false,
  },
});
