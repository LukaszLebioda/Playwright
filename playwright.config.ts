import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	// globalSetup: require.resolve("./globalSetup.js") -> to run before all tests
	testDir: "./tests", // directory with test specs
	timeout: 15 * 1000, // locator timeout, default -> 30000
	expect: { timeout: 5000 }, // assertion timeout
	fullyParallel: false, // to use only single worker at a time
	forbidOnly: false, // default -> !!process.env.CI
	retries: 1, // default -> process.env.CI ? 2 : 1
	workers: process.env.CI ? 1 : 1, // default -> ? 1 : undefined
	// other reporter -> line
	reporter: [["html", { open: "on-failure" }]], // or "never"
	use: {
		headless: true,
		baseURL: "http://localhost:2221",
		trace: "retain-on-failure", // or -> "on", "on-first-retry";
		video: "retain-on-failure", // or -> "on", "on-first-retry";
	},
	projects: [
		// -------------------------------------------------------
		// for authenticated state
		// { name: "setup", testMatch: "auth.setup.ts" },
		// {
		// 	name: "chromium",
		// 	use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
		// 	dependencies: ["setup"],
		// },
		// -------------------------------------------------------
		// // for running tests in various projects (e.g. --project=test)
		// {
		// 	name: "test",
		// 	use: {
		// 		...devices["Desktop Chrome"],
		// 		baseURL: "http://localhost:4200",
		// 	},
		// }
		// -------------------------------------------------------
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] },
		// },
		// {
		// 	name: "webkit",
		// 	use: { ...devices["Desktop Safari"] },
		// },
	],
});
