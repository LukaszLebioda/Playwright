import { test } from '@playwright/test'

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

    test.skip('user-facing locators - getByTitle', async ({ page }) => {
        await page.getByTitle('Conduit').click()
    })

    // not user-facing selector
    // data-testid is needed (it's Playwright locator, that can be renamed in settings)
    test.skip('user-facing locators - getByTestId', async ({ page }) => {
        await page.getByTestId('sometestid').click()
    })
})
