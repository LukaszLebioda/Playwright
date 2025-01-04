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
	const url = "https://demo-bank.vercel.app/";
	const username = "testerLO";
	const password = "Lala123?";
	const receiverId = "2";
	const transferAmount = "150";
	const transferTitle = "pizza";
	const expectedTransfrerReceiver = "Chuck Demobankowy";

	test.only("quick payment with correct data", async ({ page }) => {
		await page.goto(url);

		await page.getByTestId("login-input").fill(username);
		await page.getByTestId("password-input").fill(password);
		await page.getByTestId("login-button").click();

		await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
		await page.locator("#widget_1_transfer_amount").fill(transferAmount);
		await page.locator("#widget_1_transfer_title").fill(transferTitle);
		await page.getByRole("button", { name: "wykonaj" }).click();
		await page.getByTestId("close-button").waitFor();
		await page.getByTestId("close-button").click();

		await expect(page.locator("#show_messages")).toHaveText(
			`Przelew wykonany! ${expectedTransfrerReceiver} - ${transferAmount},00PLN - ${transferTitle}`
		);
	});

	test("successful mobile top-up", async ({ page }) => {
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
