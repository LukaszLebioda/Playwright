import { expect } from "@playwright/test";
import { Navigation } from "./Navigation.js";
import { isDesktopViewport } from "./../utils/isDesktopViewport.js";

export class ProductsPage {
	constructor(page) {
		this.page = page;

		this.addButtons = page.locator('[data-qa="product-button"]');
		this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
		this.productTitle = page.locator('[data-qa="product-title"]');
	}

	visit = async () => {
		await this.page.goto("/");
	};

	addProductToBasket = async (index) => {
		const specificAddButton = this.addButtons.nth(index);
		await specificAddButton.waitFor();
		await expect(specificAddButton).toHaveText("Add to Basket");
		const navigation = new Navigation(this.page);
		// only against desktop
		let getBasketCountBeforeAdding;
		if (isDesktopViewport(this.page)) {
			getBasketCountBeforeAdding = await navigation.getBasketCount();
		}
		await specificAddButton.click();
		await expect(specificAddButton).toHaveText("Remove from Basket");
		// only against desktop viewport
		if (isDesktopViewport(this.page)) {
			const getBasketCountAfterAdding = await navigation.getBasketCount();
			expect(getBasketCountAfterAdding).toBeGreaterThan(
				getBasketCountBeforeAdding
			);
		}
	};

	sortByCheapest = async () => {
		await this.sortDropdown.waitFor();
		await this.productTitle.first().waitFor();
		const productsTitlesBeforeSorting = await this.productTitle.allInnerTexts();
		await this.sortDropdown.selectOption({ value: "price-asc" });
		const productsTitlesAfterSorting = await this.productTitle.allInnerTexts();
		expect(productsTitlesBeforeSorting).not.toEqual(productsTitlesAfterSorting);
		// await this.page.pause()
	};
}
