import { Page, expect } from "@playwright/test";
import { NavigationPage } from "./NavigationPage";
import { FormLayoutsPage } from "./FormLayoutsPage";
import { DatePickerPage } from "./DatePickerPage";

export class PageObjectManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formsLayoutPage: FormLayoutsPage;
  private readonly datePickerPage: DatePickerPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formsLayoutPage = new FormLayoutsPage(this.page);
    this.datePickerPage = new DatePickerPage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onFormLayoutsPage() {
    return this.formsLayoutPage;
  }

  onDatePickerPage() {
    return this.datePickerPage;
  }
}
