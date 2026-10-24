import { defineConfig, devices } from "@playwright/test";

/**
 * E2E com TanStack Start (SSR) + Vite.
 * Specs em e2e/*.spec.ts — o Vitest cobre apenas os testes de src/.
 * Ver .devin/rules/playwright.md.
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : [["html", { open: "never" }]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:8080",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  // O build de produção sai em .vercel/output (preset Nitro), então
  // `vite preview` não serve dist/: o E2E roda contra o dev server.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:8080",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
