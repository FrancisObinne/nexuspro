import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // We will run our React app on this base URL
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
