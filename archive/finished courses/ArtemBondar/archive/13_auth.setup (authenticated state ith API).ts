import { test as setup } from "@playwright/test";
import user from "../.auth/user.json";
import fs from "fs";

import { test, expect, request } from "@playwright/test";

const authFile = ".auth/user.json";

setup("authentication", async ({ request }) => {
	const response = await request.post(
		"https://conduit-api.bondaracademy.com/api/users/login",
		{
			data: {
				user: { email: "some@email.com", password: "some password" },
			},
		}
	);
	const responseBody = await response.json();
	const accessToken = responseBody.user.token;

	user.origins[0].localStorage[0].value = accessToken;
	fs.writeFileSync(authFile, JSON.stringify(user));
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
