// modules can be imported in one line!
import { test, expect } from "@playwright/test";

test.describe("extracting values", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("localhost:4200");
    await page.getByText("Forms").click();
    await page.getByText("Form layouts").click();
  });

  test("assertions", async ({ page }) => {
    // generic assertions
    const value = 5;
    expect(value).toEqual(5);
    const basicFormButton = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .locator("button");
    const basicFormButtonText = await basicFormButton.textContent();
    expect(basicFormButtonText).toEqual("Submit");

    // locator assertions (+ await)
    // we do not assert a certain value but the whole locator
    await expect(basicFormButton).toHaveText("Submit");

    // soft assertion
    // test will continues, even if assertion fails
    await expect.soft(basicFormButton).toHaveText("Submit");
    await basicFormButton.click();
  });
});
