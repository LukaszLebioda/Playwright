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
}