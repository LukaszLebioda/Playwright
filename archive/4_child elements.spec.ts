// child elements

import { test } from '@playwright/test'

test.describe('locating child elements', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://react-redux.realworld.io/#/login?_k=5jewux')
	})

	test('child elements approach 1 - multiple locators', async ({ page }) => {
		await page.locator('.row .col-md-6 :text-is("Sign In")').click()
	})

	test('child elements approach 2 - chaining locators', async ({ page }) => {
		await page
			.locator('.row')
			.locator('.col-md-6')
			.locator(':text-is("Need an account?")')
			.click()
	})

	test('child elements approach 3 - mixing locators', async ({ page }) => {
		await page
			.locator('form')
			.getByRole('button', { name: 'Sign in' })
			.first()
			.click()
	})

	// nth(), first(), last() - not preferable
	// as the elements can change location with time
	test('child elements approach 4 - using index', async ({ page }) => {
		await page.locator('input').nth(1).click()
	})
})
