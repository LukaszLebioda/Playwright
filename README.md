# General info:

## options

- npx playwright (headless),
- npx playwright --headed,
- npx playwright --ui (ui mode),

## testing pages / apps

- Rick (Udemy): /Users/llebioda/Desktop/Private/Playwright/fixtures/RickStore
- Jak testować: demo-bank.vercel.app

## playwright installation

npm init playwright (or @latest / or @1.17.123) it will generate:

- node_modules (`npm i` / npm install not needed),
- package.json & package-lock.json (`npm init` / npm init -y not needed),
- .gitignore,
- test-examples folder (not needed, to be removed),
- tests folder (we can change test destination folder name in config file),

## playwright documentation

https://playwright.dev/docs/api/class-page

every Playwright method returns:

- promise, e.g. `await page.goto("\")` (await is needed),
- locator, e.g. `page.getByRole('button')` (await not needed); locator is not a promise, so it can be assigned to a variable;

# GitHub Actions

- create .github/workflows/playwright.yaml;
- in \*.yml file create pipeline flow;
- download Rick's Store App for linux: "shopping-store-linux-amd64";
- on https://hub.docker.com/ find docker image for playwright, that matches the playwright version installed (in package.json) (mcr.microsoft.com/playwright:v1.45.0-focal);

# testing ways

## Rick UD:

- package.json => `test": "playwright test --headed` / `npm run test`;
- playwright.config.js => `reporter: "line"`
- `await this.page.pause()` => stops the execution at any moment in the code, which allows to inspect the tested page and adress the locators;
- Playwright Inspector => 'pick locator' (or console devtools);
- in config file default reporter is 'html', I changed it to: 'line';

## Jak testować YT:

- code repository:
  https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

- `npx playwright codegen https://demo-bank.vercel.app/`;
- this will open tested page (by default in playwright's chromium) and Playwright's inspector;
- just perform any action (like logging in) on the tested page and test will be automatically written within Playwright's inspector;
- to stop this press RECORD on Playwright's inspector;
- RECORD can be used on Playwright's inspector at any time, not only with codegen functionality;

- `npx playwright test` (to execute the test);
- `npx playwright test --headed` (to execute the test in headed mode);
- we can turn the headed mode on permanently in playwright-config.js => `headless: false`,
- playwright.config.js => `reporter: "html"` (opens this reporter automatically when test fails)
- `npx playwright show-report` (if playwright.config.js => reporter: "html"),
