import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
	await page.goto("https://demo-bank.vercel.app/");
	await page.getByTestId("login-input").click();
	await page.getByTestId("login-input").fill("wookie82");
	await page.getByTestId("login-input").press("Tab");
	await page
		.getByRole("link", { name: "Demobank w sam raz do testów" })
		.press("Tab");
	// await page.getByTestId("password-input").fill("demoTest");
	await page.getByTestId("login-button").click();
	await page.getByTestId("user-name").click();

	await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
});
