// timeouts (how long playwright will wait for the certain condition)

// there are 3 layers of timeout hierarchy (all to be configured in playwright.config.js):
// global timeout,
// test timeout (by default 30000)
// action timeout, nagivation timeout, expect timeout

import { test, expect } from "@playwright/test";

test.describe("autowaiting", () => {
  test.beforeEach(async ({ page }) => {
    // we're clicking a button, but it takes ca. 15 seconds
    // to perform an action (display a message)
    // playwright will wait 30 seconds by default (TEST TIMEOUT)
    await page.goto("http://uitestingplayground.com/ajax");
    const ajaxButton = page.locator("#ajaxButton");
    // better logs only
    await ajaxButton.waitFor();
    await ajaxButton.click();
  });

  test("auto-waiting", async ({ page }) => {
    // we can overwrite any timeout value like this:
    test.setTimeout(20000);

    //or we can multiply an default test timeout by 3 like this:
    test.slow();

    // we can either extend actionTimeout value in config file, or just provide timeout as a parameter for this action
    const infoMessage = page.locator(".bg-success");
    await infoMessage.click({ timeout: 20000 });

    // locator assertion have 5000ms default timeout
    // which can be overwritten locally like this
    expect(infoMessage).toHaveText("Data loaded with AJAX get request.", {
      timeout: 20000,
    });

    // example of generic assertion (value assertion)
    // const infoMessageText = await infoMessage.textContent();
    // expect(infoMessageText).toBe("Data loaded with AJAX get request.");

    // allTextContents() doesn't have auto-built wait functionality
    // so we use waitFor() with a "attached" parameter to wait
    await infoMessage.waitFor({ state: "attached" });
    const infoMessageTexts = await infoMessage.allTextContents();
    expect(infoMessageTexts).toContain("Data loaded with AJAX get request.");
  });

  test("alternative waits", async ({ page }) => {
    const infoMessage = page.locator(".bg-success");
    //wait for element
    await page.waitForSelector(".bg-success");

    // wait for particular response (Api call)
    await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

    // // wait for network calls to be completed (not recommended)
    // // Playwright will wait until all the network calls will be completed
    // await page.waitForLoadState("networkidle");

    // deliberately pauses the test execution (not recommended)
    await page.waitForTimeout(2000);

    // // waits for certain URL (e.g. after re-direct)
    // // it can be actually treated as a form of assertion
    // await page.waitForURL("your url here");

    const infoMessageTexts = await infoMessage.allTextContents();
    expect(infoMessageTexts).toContain("Data loaded with AJAX get request.");
  });
});
