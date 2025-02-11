//----------------------------------
// - to run local server => `npm start`
// - to open app => `localhost:4200`
// - npx playwright test --ui
//----------------------------------

// all the imports have been moved to: page_object_manager.ts
// import { NavigationPage } from "../page-objects/NavigationPage";
// import { FormLayoutsPage } from "../page-objects/FormLayoutsPage";
// import { DatePickerPage } from "../page-objects/DatePickerPage";
import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../page-objects/PageObjectManager";

test.describe("Page-object practice", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200");
  });

  // see Navigation.ts for some explanations on private method
  test("navigate to form page", async ({ page }) => {
    // const navigateTo = new NavigationPage(page);
    const pmManager = new PageObjectManager(page);
    await pmManager.navigateTo().formLayoutsPage();
    await pmManager.navigateTo().datepickerPage();
    await pmManager.navigateTo().smartTablePage();
    await pmManager.navigateTo().toastrPage();
    await pmManager.navigateTo().tooltipPage();
  });

  test("parameterized methods", async ({ page }) => {
    // const navigateTo = new NavigationPage(page);
    // const onFormLayoutsPage = new FormLayoutsPage(page);
    // const onDatePickerPage = new DatePickerPage(page);
    const pmManager = new PageObjectManager(page);

    await pmManager.navigateTo().formLayoutsPage();
    await pmManager
      .onFormLayoutsPage()
      .submitUsingTheGridFormWithCredentialsAndSelectOption(
        "test@test.com",
        "Wookie123?",
        "Option 2"
      );

    await pmManager
      .onFormLayoutsPage()
      .submitInlineFormWithNameEmailAndcheckbox(
        "Wookie",
        "test@test.com",
        true
      );

    await pmManager.navigateTo().datepickerPage();
    await pmManager.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
    await pmManager
      .onDatePickerPage()
      .selectDatepickerWithRangeFromToday(6, 10);
  });
});
