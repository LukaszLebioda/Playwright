import { expect } from '@playwright/test'
import { Navigation } from './Navigation'

export class ProductsPage {
	// selectors = {
	// 	addButton: '[data-qa="product-button"]',
	// }

	constructor(page) {
		this.page = page
		this.addButtons = page.locator('[data-qa="product-button"]')
	}

	visit = async () => {
		await this.page.goto('/')
	}

	addToBasketByIndex = async (index) => {
		const specificAddButton = this.addButtons.nth(index)
		await specificAddButton.waitFor()
		await expect(specificAddButton).toHaveText('Add to Basket')

		const navigation = new Navigation(this.page)

		const basketCounterBeforeAdding = await navigation.getBasketCounter()
		await specificAddButton.click()
		await expect(specificAddButton).toHaveText('Remove from Basket')
		const basketCounterAfterAdding = await navigation.getBasketCounter()
		expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding)
	}
}
