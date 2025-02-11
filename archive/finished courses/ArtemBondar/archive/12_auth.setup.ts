// create .auth folder (add it to .gitignore) to store infromation about authenticated state of the app

// create this file in test folder: auth.setup.ts

// import test as setup
import { test as setup } from "@playwright/test";

// create a file where authenticated state will be saved
// within .auth folder we just created
const authFile = ".auth/user.json";

// create setup block
// with GUI authentication steps
setup("authentication", async ({ page }) => {
  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("Sign in").click();
  await page.getByRole("textbox", { name: "Email" }).fill("wookie@wookiee.com");
  await page.getByRole("textbox", { name: "Password" }).fill("Wookie123?");
  await page.getByRole("button", { name: "Sign in" }).click();
  // we have to be absolutely sure that we have logged in
  // waiting for particular request is one way of ensuring that
  await page.waitForResponse("https://conduit-api.bondaracademy.com/api/tags");

  // use of authenticated state
  await page.context().storageState({ path: authFile });
});

// // in playwright.config.ts add setup project
// // and update each tes project accordingly
// projects: [
//   {
//     name: "setup",
//     testMatch: "auth.setup.ts",
//   },
//   {
//     name: "chromium",
//     use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
//     dependencies: ["setup"],
//   },
// ];
