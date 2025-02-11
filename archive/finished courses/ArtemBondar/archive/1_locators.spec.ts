import { test } from "@playwright/test";

test.describe("locators", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("localhost:4200");
    await page.getByText("Forms").click();
    await page.getByText("Form layouts").click();
  });

  test.skip("regular locators (css selectors", async ({ page }) => {
    page.locator("input"); // by tagname
    page.locator("#id"); // by ID
    page.locator(".class"); // by class
    page.locator("[attribute='value']"); // by attibute
    page.locator("//*[@id='someID']"); // XPath
    page.locator(":text('Partial text')"); // by partial text match
    page.locator(":text-is('Exact text')"); // by exact text match
  });

  // good practice is to use user-facing locators
  // because this is what user interacts with (not some id etc.)
  // e.g. text on a submit button can be spoiled, but not id
  test("regular locators (css selectors)", async ({ page }) => {
    await page.getByRole("textbox", { name: "Email" }).first().click();
    await page.getByRole("button", { name: "Sign in" }).first().click();
    await page.getByLabel("Email").first().click();
    await page.getByPlaceholder("Jane Doe").click();
    await page.getByText("Using the Grid").click();
    await page.getByTitle("IoT Dashboard").click();
    // await page.getByTestId("SignIn").click(); // data-testid
  });
});
