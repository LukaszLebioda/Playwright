import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	// globalSetup: require.resolve("./globalSetup.js") -> to run before all tests
	testDir: "./tests", // directory with test specs
	timeout: 15 * 1000, // locator timeout, default -> 30000
	expect: { timeout: 5000 }, // assertion timeout
	fullyParallel: true,
	forbidOnly: false, // default -> !!process.env.CI
	workers: 1, // default -> process.env.CI ? 1 : undefined,
	// other reporter -> line
	reporter: [["html", { open: "on-failure" }]], // or "never"
	use: {
		headless: true,
		baseURL: "http://localhost:2221",
		trace: "retain-on-failure", // or -> "on", "on-first-retry";
		video: "retain-on-failure", // or -> "on", "on-first-retry";
	},
	projects: [
		// for authenticated state
		// { name: "setup", testMatch: "auth.setup.ts" },
		// {
		// 	name: "chromium",
		// 	use: { ...devices["Desktop Chrome"], storageState: ".auth/user.json" },
		// 	dependencies: ["setup"],
		// },
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
