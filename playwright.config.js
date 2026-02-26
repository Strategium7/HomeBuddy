// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://www.homebuddy.com',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
  },
});
