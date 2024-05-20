import { test } from '@playwright/test'
import { ProductsPage } from './page-objects/ProductsPage.js'
import { Navigation } from './page-objects/Navigation.js'
import { Checkout } from './page-objects/Checkout.js'

test.only('first playwrigth test practise', async ({ page }) => {
	// await page.goto('/')
	const productsPage = new ProductsPage(page)
	await productsPage.visit()
	// await page.pause()
	await productsPage.addToBasketByIndex(0)
	await productsPage.addToBasketByIndex(1)
	await productsPage.addToBasketByIndex(2)
	// await page.pause()
	const navigation = new Navigation(page)
	await navigation.goToCheckout()
	// await page.pause()
	const checkout = new Checkout(page)
	await checkout.removeCheapestProduct()
})
