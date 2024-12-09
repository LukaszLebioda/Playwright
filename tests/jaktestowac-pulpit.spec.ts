//-----------------------------------------------------------------
// npx playwright codegen https://demo-bank.vercel.app/;
// npx playwright test (default: headless, --headed); page.pause();
// npx playwright test --ui (test with Playwright GUI);
// or run tests in VS Code only (Playright test plugin]);
//-----------------------------------------------------------------

/* interesting stuff:
- focus(), blur();
- fill() -> click() not needed;
- pause(), waitFor();
*/

import { test, expect } from "@playwright/test";

test.describe("pulpit tests", () => {
	test("quick payment with correct data", async ({ page }) => {
		await page.goto("https://demo-bank.vercel.app/");

		await page.goto("https://demo-bank.vercel.app/");
		await page.getByTestId("login-input").fill("testerLO");
		await page.getByTestId("password-input").fill("Lala123?");
		await page.getByTestId("login-button").click();

		await page.goto("https://demo-bank.vercel.app/pulpit.html");
		await page.locator("#widget_1_transfer_receiver").selectOption("2");
		await page.locator("#widget_1_transfer_amount").fill("150");
		await page.locator("#widget_1_transfer_title").fill("pizza");
		await page.getByRole("button", { name: "wykonaj" }).click();
		await page.getByTestId("close-button").click();

		await expect(page.locator("#show_messages")).toHaveText(
			"Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza"
		);
	});

	test.only("successful mobile top-up", async ({ page }) => {
		await page.goto("https://demo-bank.vercel.app/");

		await page.getByTestId("login-input").fill("testerLO");
		await page.getByTestId("password-input").fill("Lala123?");
		await page.getByTestId("login-button").click();

		await page.locator("#widget_1_topup_receiver").selectOption("503 xxx xxx");
		await page.locator("#widget_1_topup_amount").fill("40");
		await page.locator("#uniform-widget_1_topup_agreement span").click();
		// await page.getByText("zapoznałem się z regulaminem").click();
		await page.getByRole("button", { name: "doładuj telefon" }).click();
		await page.getByTestId("close-button").click();

		await expect(page.locator("#show_messages")).toHaveText(
			"Doładowanie wykonane! 40,00PLN na numer 503 xxx xxx"
		);
	});
});
