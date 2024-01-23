import { test } from '@playwright/test'

test.describe('test suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://react-redux.realworld.io/#/login?_k=5jewux')
    })

    test('has title 1', async ({ page }) => {
        await page.getByText('Home').click()
        await page.getByText('Sign in').click()
    })

    test('has title 2', async ({ page }) => {
        await page.getByText('Home').click()
        await page.getByText('Sign in').click()
    })
})
