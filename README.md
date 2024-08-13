# installation

npm init playwright (or @latest / or @1.17.123) it will generate:

- node_modules (npm i / npm install not needed),
- package.json & package-lock.json (npm init / npm init -y not needed),
- .gitignore,
- test-examples folder (not needed, to be removed),
- tests folder (we can change test destination folder name in config file),

# documentation

https://playwright.dev/docs/api/class-page

every Playwright method returns:

- promise, e.g. await page.goto("\") (await is needed),
- locator, e.g. page.getByRole('button') (await not needed); locator is not a promise, so it can be assigned to a variable;

# testing ways

1. RICK:

- playwright test --headed;
- await this.page.pause() => stops the execution at any moment in the code, which allows to inspect the tested page and adress the locators;
- Playwright Inspector => 'pick locator' (or console devtools);
- in config file default reporter is 'html', I changed it to: 'line';
- basic flow (test):
  const checkoutLink = page.getByRole('link', { name: 'Checkout' });
  await checkoutLink.waitFor();
  await checkoutLink.click();
  await expect(checkoutLink).toHaveText('checkout');
  await page.waitForURL('/something')
