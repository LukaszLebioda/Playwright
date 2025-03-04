//-----------------------------------------------------------------
// npx playwright codegen https://demo-bank.vercel.app/;
// npx playwright test (default: headless, --headed);
// npx playwright test --ui (test with Playwright GUI);
// npx playwright test testFile.spec.ts (run specific file);
// or run tests in VS Code only (Playright test plugin]);
//-----------------------------------------------------------------

// worker - instance of a browser (in incognito mode) within tests are ran; by default playwright create a separate worker for every spec file

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	// login
	await page.goto("https://conduit.bondaracademy.com/");
	await page.getByText("Sign in").click();
	await page.getByRole("textbox", { name: "Email" }).fill("wookie@wookiee.com");
	await page.getByRole("textbox", { name: "Password" }).fill("Wookie123?");
	await page.getByRole("button", { name: "Sign in" }).click();
});

// in this test we are clicking on the first like button
// for that we need a setup file which will create an article
// newArticle.setup.ts

// and also we have to crate a separate project in config file:
/*
projects: [
	{
		name: "likeCounter",
		testMatch: "likesCounter.spec.ts",
		use
	}
]
*/

test("project setup", async ({ page }) => {
	await page.goto("https://conduit.bondaracademy.com/");
	await page.getByText("Global feed").click();
	const firstLikeButton = page
		.locator("app-article-preview")
		.first()
		.locator("button");
	await firstLikeButton.click();
});
