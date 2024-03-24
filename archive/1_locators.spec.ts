import { test } from '@playwright/test'

// unlike Cypress, Playwright will not return anything
// if there is no action performed on a selector
// so - page.locator('input') won't do anything
// but - await page.locator('input').click() - will

test.describe('general locators', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://react-redux.realworld.io/#/login?_k=5jewux')
	})

	// get by tag name
	test('locator syntax rules', async ({ page }) => {
		// get by tag name
		page.locator('input')
		// get by ID or class
		page.locator('#someID')
		page.locator('.someClass')
		// get by attribute
		page.locator('[placeholder="Email"]')
		// get by full class value
		page.locator('[class="classOne classTwo classThree"]')
		// get by combining selectors
		page.locator('input[placeholder="Email"] [type="submit"]')

		// find by partial text
		page.locator(':text("Need an"')
		// find by total text
		page.locator(':text-is("Need an account?"')
	})
})

// user-facing locators are locators that mimic user's behaviour on the website
// user doesn't see clasess, ids etc.
// user sees button with a text 'SIGN IN' and click it

test.describe('locators', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://react-redux.realworld.io/#/login?_k=5jewux')
	})

	test('user-facing locators - getByRole', async ({ page }) => {
		await page.getByRole('textbox', { name: 'Email' }).click()
		await page.getByRole('button', { name: 'Sign in' }).click()
	})

	test.skip('user-facing locators - getByLabel', async ({ page }) => {
		await page.getByLabel('Email').click()
	})

	test('user-facing locators - getByPlaceholder', async ({ page }) => {
		await page.getByPlaceholder('Password').click()
	})

	test('user-facing locators - getByText', async ({ page }) => {
		await page.getByText('Home').click()
	})

	test('user-facing locators - getByTitle', async ({ page }) => {
		await page.getByTitle('Conduit').click()
	})

	// not user-facing selector
	// data-testid is needed (it's Playwright locator, that can be renamed in settings)
	test('user-facing locators - getByTestId', async ({ page }) => {
		await page.getByTestId('sometestid').click()
	})
})
