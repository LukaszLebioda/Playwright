// modules can be imported in one line!
import { test, expect } from "@playwright/test";

test.describe("extracting values", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("localhost:4200");
    await page.getByText("Forms").click();
    await page.getByText("Form layouts").click();
  });

  test("Re-using the locators", async ({ page }) => {
    // locators can be stored in variables!!!
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });

    // getting one text value
    const buttonText = await basicForm.locator("button").textContent();
    expect(buttonText).toEqual("Submit");

    // getting multiple text values
    const radioButtonsTexts = await page.locator("nb-radio").allTextContents();
    expect(radioButtonsTexts).toContain("Option 1");

    // getting input value
    // const emailInput = page.locator("#exampleInputEmail1");
    const emailInput = basicForm.getByRole("textbox", { name: "Email" });
    await emailInput.fill("wookie@wookie.com");
    const emailValue = await emailInput.inputValue();
    // generic assertion
    expect(emailValue).toEqual("wookie@wookie.com");
    // locator assertion
    // expect(emailInput).toHaveValue("wookie@wookie.com");

    // getting attribute value
    const emailPlaceholder = await emailInput.getAttribute("placeholder");
    expect(emailPlaceholder).toEqual("Email");
  });
});
