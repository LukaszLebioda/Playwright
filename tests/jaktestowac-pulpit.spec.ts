import { test, expect } from "@playwright/test";

test.describe.skip("pulpit tests", () => {
	test("quick payment with correct data", async ({ page }) => {
		// Arrange
		const url = "https://demo-bank.vercel.app/";
		const username = "testerLO";
		const password = "Lala123?";
		const receiverId = "2";
		const transferAmount = "150";
		const transferTitle = "pizza";
		const expectedTransfrerReceiver = "Chuck Demobankowy";

		// Act
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

		// Assert
		await expect(page.locator("#show_messages")).toHaveText(
			`Przelew wykonany! ${expectedTransfrerReceiver} - ${transferAmount},00PLN - ${transferTitle}`
		);
	});

	test("successful mobile top-up", async ({ page }) => {
		// Arrange
		const url = "https://demo-bank.vercel.app/";
		const username = "testerLO";
		const password = "Lala123?";
		const topUpReceiver = "503 xxx xxx";
		const topUpAmount = "40";
		const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

		// Act
		await page.goto(url);
		await page.getByTestId("login-input").fill(username);
		await page.getByTestId("password-input").fill(password);
		await page.getByTestId("login-button").click();
		await page.locator("#widget_1_topup_receiver").selectOption(topUpReceiver);
		await page.locator("#widget_1_topup_amount").fill(topUpAmount);
		await page.locator("#uniform-widget_1_topup_agreement span").click();
		// await page.getByText("zapoznałem się z regulaminem").click();
		await page.getByRole("button", { name: "doładuj telefon" }).click();
		await page.getByTestId("close-button").click();

		// Assert
		await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
	});
});
