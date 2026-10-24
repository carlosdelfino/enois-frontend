import { expect, test } from "@playwright/test";

/**
 * Smoke E2E: página inicial renderiza via SSR e hidrata sem erros fatais.
 * Expandir conforme fluxos críticos (ver .devin/rules/playwright.md).
 */
test.describe("smoke", () => {
  test("home carrega com conteúdo SSR", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));

    await page.goto("/");
    await expect(page.locator("body")).not.toBeEmpty();
    expect(errors, `erros de página: ${errors.join("; ")}`).toEqual([]);
  });
});
