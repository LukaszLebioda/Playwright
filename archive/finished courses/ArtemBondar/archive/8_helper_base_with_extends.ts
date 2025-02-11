// 1. Create HelperBase class

import { Page } from "@playwright/test";

export class HelperBase {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async waitForNumberOfSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}

// 2. Import it and use it in another class
// with EXTENDS OOM concept

// import { type Page } from "@playwright/test";
// import { HelperBase } from "./HelperBase"; // IMPORT

export class NavigationPage extends HelperBase {
  // readonly page: Page;

  // CONSTRUCTOR LOOKS LIKE THIS
  constructor(page: Page) {
    super(page);
  }

  async formLayoutsPage() {
    await this.waitForNumberOfSeconds(2); // USE HELPER METHOD
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Form layouts").click();
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms");
    // just to show that private method is working
    await this.page.waitForTimeout(1000);
    await this.page.getByText("Datepicker").click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByText("Smart Table").click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
  }

  // helper private method visible only within this class
  // will check if a list element has been clicked or not
  // (this element, when clicked, expands, and displays other elements)
  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState === "false") {
      await groupMenuItem.click();
    }
  }
}
