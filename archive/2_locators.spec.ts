import { test } from '@playwright/test'

// unlike Cypress, Playwright will not return anything
// if there is no action performed on a selector
// so - page.locator('input') won't do anything
// but - await page.locator('input').click() - will

test.describe('test suite', () => {
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
