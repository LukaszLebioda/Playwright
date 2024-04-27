import { test, expect } from '@playwright/test'
import { ProductsPage } from './page-objects/ProductsPage'

test.only('Full e2e store journey', async ({ page }) => {
	// await page.goto('/')
	const productsPage = new ProductsPage(page)
	await productsPage.visit()
	// await page.pause()

	await productsPage.addToCartByIndex(0)
	await productsPage.addToCartByIndex(1)
	await productsPage.addToCartByIndex(2)
	await page.pause()

	// const someText = 'some text typed in'
	// await page.goto('/textinput')
	// // await page.pause() // to pause the execution and use INSPECTOR
	// const textInput = page.getByPlaceholder('MyButton')
	// await textInput.fill(someText)
	// const myButton = page.locator('#updatingButton')
	// await myButton.waitFor() // to have better (error) logs
	// await expect(myButton).toContainText('Button That Should Change')
	// await myButton.click()
	// // await page.pause() // to pause the execution and see the result so far
	// await expect(myButton).toHaveText(someText)
	// const myButtons = page.getByRole('button', { name: someText })
	// console.log('number of buttons: ', await myButtons.count()) // to count elements
	// const homeLink = page.getByRole('link', { name: 'Home' })
	// await homeLink.waitFor() // to be sure the element will be caught
	// await homeLink.click()
	// // to assert that we landed on proper page
	// await page.waitForURL('homee')
})
