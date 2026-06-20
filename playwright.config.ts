import { defineConfig, devices } from '@playwright/test';

const baseURL = 'https://localhost';

export default defineConfig({
  testDir: './tests',
  
  fullyParallel: false,
  
  forbidOnly: !!process.env.CI,
  
  retries: process.env.CI ? 2 : 0,
  
  workers: 1,
  
  reporter: 'html',
  
  use: {
    baseURL: baseURL,
    
    ignoreHTTPSErrors: baseURL.includes('localhost') || baseURL.includes('nginx'),

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});