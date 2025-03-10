import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();

const randomName = faker.person.firstName();
const randomMail1 = faker.internet.email();
const randomMail2 = `${randomName}${faker.number.int(100)}@test.com`;
const password = `Wookie123`;

test.describe("", () => {
	test("random data generator - faker js", async ({ page }) => {
		// we can define URL in .env file

		// or we can pass it in cli command:
		// URL=https://conduit.bondaracademy.com/ npx playwright test
		// what we can store in npm script as well

		await page.goto(process.env.URL || "default_url");
		await page.getByText("Sign in").click();
		await page.getByRole("textbox", { name: "Email" }).fill(randomMail2);
		await page
			.getByRole("textbox", { name: "Password" })
			.fill(process.env.PASSWORD || "");
		await page.getByRole("button", { name: "Sign in" }).click();

		// // general screenshot
		// await page.screenshot({ path: "screenshot.png" });
		// // 1-element-screenshot
		// await page
		// 	.getByRole("textbox", { name: "Password" })
		// 	.screenshot({ path: "screenshotten.png" });
		// // binary screenshot
		// const buffer = await page.screenshot();
		// console.log(buffer.toString("base64"));

		// expect(page.locator(".error-messages li")).toHaveText(
		// 	"email or password is invalid"
		// );
		expect(1).toEqual(1);
	});
});
