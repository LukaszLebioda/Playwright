import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
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
		// {
		// 	name: "test",
		// 	use: {
		// 		...devices["Desktop Chrome"],
		// 		baseURL: "http://localhost:4200",
		// 	},
		// }
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
			// dependencies: ["test"],
			// timeout: 60 * 1000,
			// testMAtch: "test.spec.ts",
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
