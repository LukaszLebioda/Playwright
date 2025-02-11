// PAGE OBJECT

import { type Page } from "@playwright/test";

export class formLayoutsPage {
  private readonly page: Page;

  constructor(page) {
    this.page = page;
  }

  /*
  option 1:

  async myFunction() {
    console.log("old fashioned function")
  }

  option 2:

  myFunction = async () => {
    console.log("arrow function")
  }

  */

  /**
   * This method fills out the inline form with user details
   * @param name - should be first and last name
   * @param email - valid email
   * @param rememberMe - true or false (user session)
   */
  async submitInlineFormWithNameEmailAndcheckbox(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    const inlineForm = this.page.locator("nb-card", { hasText: "Inline form" });
    await inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
    await inlineForm.getByRole("textbox", { name: "Email" }).fill(email);

    if (rememberMe) {
      await inlineForm.getByRole("checkbox").check({ force: true });
    }

    await inlineForm.getByRole("button", { name: "Submit" }).click();
  }

  // helper private method visible only within this class
  // we often use such private methods to avoid duplication
  // thus parts of code can be used in many methods
  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState === "false") {
      await groupMenuItem.click();
    }
  }
}

// TEST

// import { test, expect } from "@playwright/test";
// import { NavigationPage } from "../page-objects/navigationPage";
// import { formLayoutsPage } from "../page-objects/formLayoutsPage";

// test.describe("Upage-object practice", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:4200");
//   });

//   test("navigate to form page", async ({ page }) => {
//     const navigateTo = new NavigationPage(page);
//     await navigateTo.formLayoutsPage();
//     await navigateTo.datepickerPage();
//     await navigateTo.smartTablePage();
//     await navigateTo.toastrPage();
//     await navigateTo.tooltipPage();
//   });

//   test("parameterized methods", async ({ page }) => {
//     const navigateTo = new NavigationPage(page);
//     const onFormLayoutsPage = new formLayoutsPage(page);
//     await navigateTo.formLayoutsPage();

//     await onFormLayoutsPage.submitInlineFormWithNameEmailAndcheckbox(
//       "Wookie",
//       "test@test.com",
//       true
//     );
//   });
// });
