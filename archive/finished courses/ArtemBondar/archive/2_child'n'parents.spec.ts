import { test } from "@playwright/test";

test.describe("locators", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("localhost:4200");
    await page.getByText("Forms").click();
    await page.getByText("Form layouts").click();
  });

  test("locating child elements", async ({ page }) => {
    // multiple locators
    await page.locator("nb-card nb-radio :text-is('Option 1')").click();
    // chaining locators
    await page
      .locator("nb-card")
      .locator("nb-radio")
      .locator(":text-is('Option 2')")
      .click();
    // combining locators
    await page
      .locator("nb-card")
      .getByRole("button", { name: "Sign in" })
      .first()
      .click();
    // using index (not preferable, order may change)
    await page.locator("nb-card").nth(2).getByRole("button").click();
  });

  test("locating parent elements", async ({ page }) => {
    // only the parent element, whose child (any child) has certain text
    // using second locator parameter
    await page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" })
      .click();
    // only the parent element, whose child (any child) has certain locator
    // using second locator parameter
    await page
      .locator("nb-card", { has: page.locator("#inputEmail1") })
      .getByRole("textbox", { name: "Email" })
      .click();
    // same as above, but using in-built playwright method filter()
    await page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("textbox", { name: "Email" })
      .click();
    await page
      .locator("nb-card")
      .filter({ has: page.locator(".status-danger") })
      .getByRole("textbox", { name: "Password" })
      .click();
    // filter methods can be chained to further filter the results
    await page
      .locator("nb-card")
      .filter({ has: page.locator("nb-checkbox") })
      .filter({ hasText: "Sign in" })
      .getByRole("textbox", { name: "Email" })
      .click();
    // used when we want to go only 1 element up => with Xpath
    await page
      .locator(":text-is('Using the Grid')")
      .locator("..")
      .getByRole("textbox", { name: "Email" })
      .click();
  });
});
