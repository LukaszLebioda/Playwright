import { test, expect } from "@playwright/test";
import tags from "../test-data/tags.json";

test.beforeEach(async ({ page }) => {
  // we are intercepting the response,
  // and replacing (fulfilling) actual response
  // with our own "tags" response;
  await page.route("https://*/**/api/tags", async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });

  // another intercept, this time with fetching first
  await page.route("https://*/**/api/articles*", async (route) => {
    // fetch is used to complete the API call and get the response
    const response = await route.fetch();
    const responseBody = await response.json();
    // update the response
    responseBody.articles[0].title = "Wookie";
    responseBody.articles[0].description = "Wookovsky";
    // fulfill (replace) the response
    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });

  // and only then we go to the page
  await page.goto("https://conduit.bondaracademy.com/");
});

test.skip("has text", async ({ page }) => {
  // assertion for the first mock for tags (fulfill)
  const header = page.locator("a[class='navbar-brand']");
  await expect(header).toHaveText("conduit");
  // assertion for the second mock for articles (fetch + fulfill)
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "Wookie"
  );
  await expect(page.locator("app-article-list p1").first()).toContainText(
    "Wookovsky"
  );
  await page.waitForTimeout(500); // may be needed for Playwright to react and to actually display changes, but existence of assertion should be enough
});
