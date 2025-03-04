import { test, expect, request } from "@playwright/test";

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

// and also we have to crate a separate projects in config file:
// one project for article setup and another for like counter
/*
projects: [
    {
        name: "articleSetup",
        testMatch: "newArticle.setup.ts",  
    {
        name: "likeCounter",
        testMatch: "likesCounter.spec.ts",
        dependencies: ["articleSetup"],
    }
]
*/

// only then we can click like button (on this newly created article)
test("project setup", async ({ page }) => {
	await page.goto("https://conduit.bondaracademy.com/");
	await page.getByText("Global feed").click();
	const firstLikeButton = page
		.locator("app-article-preview")
		.first()
		.locator("button");

	await expect(firstLikeButton).toContainText("0");
	await firstLikeButton.click();
	await expect(firstLikeButton).toContainText("1");
});

// and finally we delete the article
// which cxan also be done in a separater setup file
// for that we need articleId
test("teardown (delete article)", async ({ request }) => {
	const deleteArticleResponse = await request.delete(
		`https://conduit-api.bondaracademy.com/api/${process.env.ARTICLE_ID}`
	);
	expect(deleteArticleResponse.status()).toEqual(204);
});
