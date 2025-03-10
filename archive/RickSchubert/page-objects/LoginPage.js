export class LoginPage {
	constructor(page) {
		this.page = page;

		this.movoToSignupButton = page.locator('[data-qa="go-to-signup-button"]');
	}

	moveToSignup = async () => {
		await this.movoToSignupButton.waitFor();
		await this.movoToSignupButton.click();
		this.page.waitForURL(/\/signup/, { timeout: 3000 });
		// await this.page.pause()
	};
}
