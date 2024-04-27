export class ProductsPage {
	locators = {
		addToCartButton: '[data-qa="product-button"]',
	}

	constructor(page) {
		this.page = page
		this.addButtons = page.locator(this.locators.addToCartButton)
	}

	visit = async () => {
		await this.page.goto('/')
	}

	addToCartByIndex = async index => {
		// await this.page.locator('[data-qa="product-button"]').nth(index).click()
		await this.addButtons.nth(index).waitFor()
		await this.addButtons.nth(index).click()
	}
}

// export const productPage = new ProductPage()
