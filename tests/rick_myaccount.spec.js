// import * as dotenv from "dotenv";
// dotenv.config();
import { test } from "@playwright/test";
import { MyAccount } from "./../page-objects/MyAccount.js";
import { getLoginToken } from "./../api-calls/getLoginToken.js";
import { adminDetails } from "./../fixtures/userDetails.js";

test("My Account using cookie  and mocking network requests", async ({
	page,
}) => {
	const loginToken = await getLoginToken(
		adminDetails.username,
		adminDetails.password
	);
	// console.warn({ loginToken });

	// to mock api calls;
	await page.route("**/api/user**", async (route, request) => {
		await route.fulfill({
			status: 500,
			contentType: "application/json",
			body: JSON.stringify({ message: "PLAYWRIGHT ERROR FROM MOCKING" }),
		});
	});

	const myAccount = new MyAccount(page);
	await myAccount.visit();

	// evaluate => to operate on document (or window) object
	await page.evaluate((loginToken) => {
		document.cookie = `token=${loginToken}`;
	}, loginToken);

	await myAccount.visit(); // again, it's like refresh
	await myAccount.waitForPageHeading();
	await myAccount.waitForErrorMessage();
});
