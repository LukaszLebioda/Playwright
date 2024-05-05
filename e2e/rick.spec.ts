import { test } from '@playwright/test'
import { ProductsPage } from './page-objects/ProductsPage'

test.only('first playwrigth test practise', async ({ page }) => {
	// await page.goto('/')
	const productsPage = new ProductsPage(page)
	await productsPage.visit()
	// await page.pause()
	await productsPage.addToBasketByIndex(0)
	await productsPage.addToBasketByIndex(1)
	await productsPage.addToBasketByIndex(2)
	// await page.pause()
})
