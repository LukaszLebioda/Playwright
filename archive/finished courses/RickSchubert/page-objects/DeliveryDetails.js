import { expect } from "@playwright/test";

export class DeliveryDetails {
	constructor(page) {
		this.page = page;

		this.firstNameInput = page.getByPlaceholder("First name");
		this.lastNameInput = page.getByPlaceholder("Last name");
		this.streetInput = page.getByPlaceholder("Street");
		this.postcodeInput = page.getByPlaceholder("Post code");
		this.cityNameInput = page.getByPlaceholder("City");
		this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
		this.saveAddressButton = page.getByRole("button", {
			name: "Save address for next time",
		});
		this.savedAddressContainer = page.locator(
			'[data-qa="saved-address-container"]'
		);
		this.savedAddressFirstName = page.locator(
			'[data-qa="saved-address-firstName"]'
		);
		this.savedAddressLastName = page.locator(
			'[data-qa="saved-address-lastName"]'
		);
		this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
		this.savedAddressPostcode = page.locator(
			'[data-qa="saved-address-postcode"]'
		);
		this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
		this.savedAddressCountry = page.locator(
			'[data-qa="saved-address-country"]'
		);

		this.continueToPaymentButton = page.getByRole("button", {
			name: "Continue to payment",
		});
	}

	fillDeliveryDetails = async (userAddress) => {
		await this.firstNameInput.waitFor();
		await this.firstNameInput.fill(userAddress.firstName);
		await this.lastNameInput.waitFor();
		await this.lastNameInput.fill(userAddress.lastName);
		await this.streetInput.waitFor();
		await this.streetInput.fill(userAddress.street);
		await this.postcodeInput.waitFor();
		await this.postcodeInput.fill(userAddress.postcode);
		await this.cityNameInput.waitFor();
		await this.cityNameInput.fill(userAddress.city);
		await this.countryDropdown.waitFor();
		await this.countryDropdown.selectOption(userAddress.country);
	};

	saveDeliveryDetails = async () => {
		const addressCountBeforeSaving = await this.savedAddressContainer.count();
		await this.saveAddressButton.waitFor();
		await this.saveAddressButton.click();
		await expect(this.savedAddressContainer).toHaveCount(
			addressCountBeforeSaving + 1
		);

		await this.savedAddressFirstName.first().waitFor();
		expect(await this.savedAddressFirstName.first().innerText()).toEqual(
			await this.firstNameInput.inputValue()
		);
		await this.savedAddressLastName.first().waitFor();
		expect(await this.savedAddressLastName.first().innerText()).toEqual(
			await this.lastNameInput.inputValue()
		);
		await this.savedAddressStreet.first().waitFor();
		expect(await this.savedAddressStreet.first().innerText()).toEqual(
			await this.streetInput.inputValue()
		);
		await this.savedAddressPostcode.waitFor();
		expect(await this.savedAddressPostcode.first().innerText()).toEqual(
			await this.postcodeInput.inputValue()
		);
		await this.savedAddressCity.first().waitFor();
		expect(await this.savedAddressCity.first().innerText()).toEqual(
			await this.cityNameInput.inputValue()
		);
		await this.savedAddressCountry.first().waitFor();
		expect(await this.savedAddressCountry.first().innerText()).toEqual(
			await this.countryDropdown.inputValue()
		);
	};

	continueToPayment = async () => {
		await this.continueToPaymentButton.waitFor();
		await this.continueToPaymentButton.click();
		await this.page.waitForURL(/\/payment/, { timeout: 3000 });
	};
}
