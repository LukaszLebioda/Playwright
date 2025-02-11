// UI components

import { test, expect } from "@playwright/test";

test.describe("UI components", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200");
  });

  test("input fields / textboxes", async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form layouts").click();

    // const inputField = page.locator("#inputEmail1");
    const inputField = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await inputField.waitFor();
    await inputField.fill("test@test.com");
    await inputField.clear();

    // simulates key strokes, accepts delay parameter
    await inputField.pressSequentially("test2@test.com", { delay: 200 });

    // generic asserton (grabbing the text first / no await needed)
    const inputFieldValue = await inputField.inputValue();
    expect(inputFieldValue).toEqual("test2@test.com");

    // locator assertion (locator only / await needed)
    await expect(inputField).toHaveValue("test2@test.com");
  });

  test("radio buttons", async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form layouts").click();

    const gridForm = page.locator("nb-card", { hasText: "Using the Grid" });
    const radioButton1 = gridForm.getByLabel("Option 1");
    const radioButton2 = gridForm.getByLabel("Option 2");

    await radioButton1.check({ force: true });
    await radioButton2.check({ force: true });

    // generic assertion (returns boolean)
    const statusRadioButton1 = await radioButton1.isChecked();
    const statusRadioButton2 = await radioButton2.isChecked();
    // expect(statusRadioButton1).not.toEqual(true);
    // expect(statusRadioButton1).not.toBeTruthy;
    expect(statusRadioButton1).toBeFalsy();
    expect(statusRadioButton2).toBeTruthy();

    // locator assertion
    await expect(radioButton1).not.toBeChecked();
    await expect(radioButton2).toBeChecked();
  });

  test("checkboxes", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();

    const checkbox1 = page.getByRole("checkbox", { name: "Hide on click" });
    // await checkbox1.waitFor();
    await checkbox1.click({ force: true }); // clicks to check or uncheck
    await checkbox1.uncheck({ force: true }); // clicks to uncheck
    await checkbox1.check({ force: true }); // clicks to check

    // check or uncheck all checkboxes
    const allCheckboxes = page.getByRole("checkbox");
    // console.log(await allCheckboxes.count());

    const allCheckboxesIntoArray = await allCheckboxes.all();
    for (const box of allCheckboxesIntoArray) {
      await box.check({ force: true });
      expect(await box.isChecked()).toBeTruthy();
    }
  });

  test("lists and dropdowns", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();

    // container with the list (click to expand the list)
    const dropdownMenu = page.locator("ngx-header nb-select");
    await dropdownMenu.waitFor();
    await dropdownMenu.click();

    // recommended (with regular lists)
    page.getByRole("list"); // when list has html "ul" tag
    page.getByRole("listitem"); // when list has html "li" tag

    // verifying list elements texts
    // const listOfOptions = page.getByRole("list").locator("nb-option");
    const listOfOptions = page.locator("nb-option-list nb-option");
    await expect(listOfOptions).toHaveText([
      "Light",
      "Dark",
      "Cosmic",
      "Corporate",
    ]);

    // verifying the background-color-change
    // atfer clicking on a particular element of the list
    await listOfOptions.filter({ hasText: "Cosmic" }).click();
    const header = page.locator("nb-layout-header");
    await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

    // verifying the background-color-change
    // atfer clicking on every element of the list
    await dropdownMenu.click();
    const backgroundColors = {
      Light: "rgb(255, 255, 255)",
      Dark: "rgb(34, 43, 69)",
      Cosmic: "rgb(50, 50, 89)",
      Corporate: "rgb(255, 255, 255)",
    };
    for (const color in backgroundColors) {
      await listOfOptions.filter({ hasText: color }).click();
      expect(header).toHaveCSS("background-color", backgroundColors[color]);
      if (color != "Corporate") {
        await dropdownMenu.click();
      }
    }
  });

  test("tooltips", async ({ page }) => {
    // tooltips may be difficult to find, as they tend to disappear from DOM, when we move the mouse somewhere else
    // to freeze the website and enter debug mode: devtools => sources => cmd + \ => elements (to inspect)
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();

    // find DOM area with our tooltip
    const tooltipContainer = page.locator("nb-card", {
      hasText: "Tooltip Placements",
    });

    // find button that displays tooltip on mouse-hover
    const button = tooltipContainer.getByRole("button", { name: "Top" });
    await button.hover();
    // recommended, but only if web element has role "tooltip"
    // page.getByRole("tooltip");
    const tooltipText = await page.locator("nb-tooltip").textContent();
    expect(tooltipText).toEqual("This is a tooltip");
  });

  test("browser dialog boxes", async ({ page }) => {
    // the problem with dialog boxes (like window alert, window confirm etc.)
    // is that they're clicked (cancel) automatically by PLaywright
    // and thus can't be validated easily
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    // so we have to create a listener to listen to a dialog event first
    page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept(); // instead of cancelling
    });

    // then we interact with a certain element (click)
    // like trash icon to remove row from the table in our example
    // what invokes a dialog box with confirmation
    // const trashIcon = page.getByRole("table").locator("tr", {hasText: "mdo@gmail.com"}).locator(".nb-trash")
    const trashIcon = page
      .getByRole("table")
      .locator("tbody")
      .locator("tr")
      .locator(".nb-trash")
      .first();
    await trashIcon.click();
    await expect(page.locator("table tbody tr").first()).not.toHaveText(
      "mdo@gmail.com"
    );
  });

  test("web tables", async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    // 1 get the row by any text in this row
    const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
    await targetRow.locator(".nb-edit").click();
    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("35");
    await page.locator(".nb-checkmark").click();

    // 2 get the row based on the value in the specific column
    await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
    const targetRowById = page
      .getByRole("row", { name: "11" })
      .filter({ has: page.locator("td").nth(1).getByText("11") });
    await targetRowById.locator(".nb-edit").click();
    await page.locator("input-editor").getByPlaceholder("E-mail").clear();
    await page
      .locator("input-editor")
      .getByPlaceholder("E-mail")
      .fill("tralalala@lala.com");
    await page.locator(".nb-checkmark").click();
    await expect(targetRowById.locator("td").nth(5)).toHaveText(
      "tralalala@lala.com"
    );

    // 3 test filter of the table
    const ages = ["20", "30", "40", "200"];
    for (const age of ages) {
      await page.locator("input-filter").getByPlaceholder("Age").clear();
      await page.locator("input-filter").getByPlaceholder("Age").fill(age);
      await page.waitForTimeout(500);

      const ageRows = await page.locator("tbody tr").all();

      for (const row of ageRows) {
        const cellValue = await row.locator("td").last().textContent();
        // const noDataFound = await page.locator("")
        if (age !== "200") {
          expect(cellValue).toEqual(age);
        } else {
          expect(await page.getByRole("table").textContent()).toContain(
            "No data found"
          );
        }
      }
    }
  });

  test("datepicker", async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();

    const calendarInputField = page.getByPlaceholder("Form Picker");
    await calendarInputField.click();

    let date = new Date();
    date.setDate(date.getDate() + 7);
    const expectedDate = date.getDate().toString();
    const expectedMonthShot = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await page
        .locator("nb-calendar-view-mode")
        .textContent();
    }
    await page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText(expectedDate, { exact: true })
      .click();

    await expect(calendarInputField).toHaveValue(dateToAssert);
  });

  test("slider", async ({ page }) => {
    // Updating slider attribute (coordinates)
    // const temperatureGauge = page.locator(
    //   "[tabtitle='Temperature'] ngx-temperature-dragger circle"
    // );
    // await temperatureGauge.evaluate((node) => {
    //   node.setAttribute("cx", "232.630");
    //   node.setAttribute("cy", "232.630");
    // });
    // await temperatureGauge.click();

    // Simulating mouse movements
    // we first create a locator for the area where mouse is moving
    const temperatureBox = page.locator(
      "[tabtitle='Temperature'] ngx-temperature-dragger"
    );
    // and it should be visible for the browser (scroll into view)
    await temperatureBox.scrollIntoViewIfNeeded();
    // this method creates coordinates for that area or outside it
    const box = await temperatureBox.boundingBox();
    // defining center for our bounding box
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y); // starting point
    await page.mouse.down(); // left-click (and keep pressing)
    await page.mouse.move(x + 100, y); // (pixels) move rightwards
    await page.mouse.move(x + 100, y + 100); // (pixels) move downwards
    await page.mouse.up(); // release mouse click
    await expect(temperatureBox).toContainText("30");
  });

  test("drag & drop (with iframes)", async ({ page }) => {
    await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");

    // the locator we're looking for is within iframe
    // and by default playwright can not find it
    // so first we have to navigate to the iframe
    const frame = page.frameLocator("[rel-title='Photo Manager'] iframe");
    // and then to the element we're interested in
    await frame
      .locator("li", { hasText: "High Tatras 2" })
      .dragTo(frame.locator("#trash"));

    // more precise control over mouse
    await frame.locator("li", { hasText: "High Tatras 4" }).hover();
    await page.mouse.down(); // left-click and keep pressing
    await frame.locator("#trash").hover();
    await page.mouse.up(); // release left-click

    // assertion that both elements have been dropped
    await expect(frame.locator("#trash li h5")).toHaveText([
      "High Tatras 2",
      "High Tatras 4",
    ]);
  });
});
