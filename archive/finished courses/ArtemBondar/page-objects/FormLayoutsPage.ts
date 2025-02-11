import { type Page } from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class FormLayoutsPage extends HelperBase {
  // private readonly page: Page;

  constructor(page: Page) {
    super(page);
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await usingTheGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);
    await usingTheGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });
    await usingTheGridForm.getByRole("button", { name: "Sign in" }).click();
  }

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
}
