//-----------------------------------------------------------------
// npx playwright codegen https://demo-bank.vercel.app/;
// npx playwright test (default: headless, --headed); page.pause();
// npx playwright test --ui (test with Playwright GUI);
// or run tests in VS Code only (Playright test plugin]);
//-----------------------------------------------------------------

import { test, expect } from "@playwright/test";

test.describe.skip("locator & selectors", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("some/url");
	});

	test("get by selectors", async ({ page }) => {
		// getBy -> methods that don't need selectors to create locators,
	});
});
