import { defineConfig, devices } from '@playwright/test';

const baseURL = 'https://localhost';

export default defineConfig({
  testDir: './tests',
  
  fullyParallel: false,
  
  forbidOnly: !!process.env.CI,
  
  retries: process.env.CI ? 2 : 0,
  
  workers: 1,
  
  use: {
    baseURL: baseURL,
    
    ignoreHTTPSErrors: baseURL.includes('localhost') || baseURL.includes('mcecelulares.local'),

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});