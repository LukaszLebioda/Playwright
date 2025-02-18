//-----------------------------------------------------------------
// npx playwright codegen https://demo-bank.vercel.app/;
// npx playwright test (default: headless, --headed);
// npx playwright test --ui (test with Playwright GUI);
// npx playwright test testFile.spec.ts (run specific file);
// or run tests in VS Code only (Playright test plugin]);
//-----------------------------------------------------------------

// worker - instance of a browser (in incognito mode) withit tests are ran; by default playwright create a separate worker for every spec file

/* interesting stuff:
- focus(), blur();
- fill() -> click() not needed;
- pause(), waitFor();
*/

import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const randomName = faker.person.firstName();
const randomMail1 = faker.internet.email();
const randomMail2 = `${randomName}${faker.number.int(100)}@test.com`;
const password = `Wookie123`;

test.describe("", () => {
	test("random data generator - faker js", async ({ page }) => {
		await page.goto("https://conduit.bondaracademy.com/");
		await page.getByText("Sign in").click();
		await page.getByRole("textbox", { name: "Email" }).fill(randomMail2);
		await page.getByRole("textbox", { name: "Password" }).fill(password);
		await page.getByRole("button", { name: "Sign in" }).click();

		expect(page.locator(".error-messages li")).toHaveText(
			"email or password is invalid"
		);
	});
});
