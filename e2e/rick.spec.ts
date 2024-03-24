import { test, expect } from '@playwright/test'

test('First tests with Rick from Udemy', async ({ page }) => {
	await page.goto('https://react-redux.realworld.io/#/login?_k=5jewux')
	// await page.pause()
})
