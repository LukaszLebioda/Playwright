import { test } from "@playwright/test";
import { MyAccount } from "./../page-objects/MyAccount.js";
import { getLoginToken } from "./../api-calls/getLoginToken.js";

test.only("My Account using cookie injection", async ({ page }) => {
	const loginToken = await getLoginToken();
	// console.warn({ loginToken });
	const myAccount = new MyAccount(page);
	await myAccount.visit();

	await page.evaluate((loginToken) => {
		document.cookie = `token=${loginToken}`;
	}, loginToken);

	await myAccount.visit(); // again, it's like refresh
	await myAccount.waitForPageHeading();
});
