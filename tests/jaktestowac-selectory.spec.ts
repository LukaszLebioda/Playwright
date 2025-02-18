import { test, expect } from "@playwright/test";

test.describe.skip("locator & selectors", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("some/url");
	});

	test("get by selectors", async ({ page }) => {
		// getBy -> methods that don't need selectors to create locators,
	});
});
