//----------------------------------------------------
// npx playwright codegen https://demo-bank.vercel.app/;
// npx playwright test (def.: headless, --headed); page.pause();
// npx playwright test --ui (test with Playwright GUI);
// or run tests in VS Code only (Playright test plugin]);
//----------------------------------------------------

/* interesting stuff:
- focus(), blur();
- fill() -> click() not needed;
- pause(), waitFor();
*/

import { test, expect } from "@playwright/test";

test.describe("User login tests", () => {
	const url = "https://demo-bank.vercel.app/";
	const username = "testerLO";
	const password = "Lala123?";
	const expectedUsername = "Jan Demobankowy";

	test("login with correct credentials", async ({ page }) => {
		await page.goto(url);
		// await page.getByTestId("login-input").click(); // redundant
		await page.getByTestId("login-input").fill(username);
		// await page.getByTestId("password-input").click(); // redundant
		await page.getByTestId("password-input").fill(password);
		await page.getByTestId("login-button").click();

		await expect(page.getByTestId("user-name")).toHaveText(expectedUsername);
	});

	test("login with incorrect username", async ({ page }) => {
		await page.goto(url);
		await page.getByTestId("login-input").fill("short");
		await page.getByTestId("password-input").fill("lala123?");

		await expect(page.getByTestId("error-login-id")).toHaveText(
			"identyfikator ma min. 8 znaków"
		);
	});

	test("login with incorrect password", async ({ page }) => {
		await page.goto(url);
		await page.locator("[data-testid='login-input']").fill("testerLO");
		// focus is like click, it focuses the input (makes it active)
		await page.locator("[data-testid='password-input']").focus();
		await page.locator("[data-testid='password-input']").fill("dupa");
		// blur is like click outside the input (makes it in-active)
		await page.locator("[data-testid='password-input']").blur();

		await expect(page.getByTestId("error-login-password")).toHaveText(
			"hasło ma min. 8 znaków"
		);
	});
});
