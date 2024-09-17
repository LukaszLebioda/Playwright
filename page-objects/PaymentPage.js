import { expect } from "@playwright/test";

export class PaymentPage {
	constructor(page) {
		this.page = page;

		// this.discountCode = page.locator('[data-qa="discount-code"]');
		this.discountCode = page
			.frameLocator('[data-qa="active-discount-container"]')
			.locator('[data-qa="discount-code"]');

		this.discountCodeInput = page.getByPlaceholder("Discount code");
		this.activateDiscountButton = page.getByRole("button", {
			name: "Submit discount",
		});
		this.discountActiveMessage = page.locator(
			'[data-qa="discount-active-message"]'
		);
		this.totalValue = page.locator('[data-qa="total-value"]');
		this.discountedValue = page.locator(
			'[data-qa="total-with-discount-value"]'
		);

		this.creditCardOwner = page.getByPlaceholder("Credit card owner");
		this.creditCardNumber = page.getByPlaceholder("Credit card number");
		this.creditCardExpiryDate = page.getByPlaceholder("Valid until");
		this.creditCardCVC = page.getByPlaceholder("Credit card CVC");
		this.payButton = page.locator('[data-qa="pay-button"]');
	}

	activateDiscount = async () => {
		await this.discountCode.waitFor();
		const code = await this.discountCode.innerText();
		await this.discountCodeInput.waitFor();
		await this.discountCodeInput.fill(code);
		await expect(this.discountCodeInput).toHaveValue(code);
		// await this.discountCodeInput.focus();
		// await this.page.keyboard.type(code, { delay: 1000 });
		// expect(await this.discountCodeInput.inputValue()).toBe(code);
		expect(await this.discountedValue.isVisible()).toBe(false);
		expect(await this.discountActiveMessage.isVisible()).toBe(false);
		await this.activateDiscountButton.waitFor();
		await this.activateDiscountButton.click();
		await this.discountActiveMessage.waitFor();
		await this.discountedValue.waitFor();

		const discountedValueText = await this.discountedValue.innerText();
		const discountedValueTextWithoutDollarSign = discountedValueText.replace(
			",",
			""
		);
		const discountedValueNumber = parseInt(
			discountedValueTextWithoutDollarSign
		);

		const totalValueValueText = await this.totalValue.innerText();
		const totalValueValueTextWithoutDollarSign = totalValueValueText.replace(
			",",
			""
		);
		const totalValueNumber = parseInt(totalValueValueTextWithoutDollarSign);

		expect(discountedValueNumber).toBeLessThan(totalValueNumber);
	};

	fillPaymentDetails = async (paymentDetails) => {
		await this.creditCardOwner.waitFor();
		await this.creditCardOwner.fill(paymentDetails.creditCardOwner);
		await this.creditCardNumber.waitFor();
		await this.creditCardNumber.fill(paymentDetails.creditCardNumber);
		await this.creditCardExpiryDate.waitFor();
		await this.creditCardExpiryDate.fill(paymentDetails.creditCardExpiryDate);
		await this.creditCardCVC.waitFor();
		await this.creditCardCVC.fill(paymentDetails.creditCardCVC);
	};

	completePayment = async () => {
		await this.payButton.waitFor();
		await this.payButton.click();

		await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
	};
}
