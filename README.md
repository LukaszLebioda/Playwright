# General info:

## options to run tests

- `npx playwright test` (headless by default),
- `npx playwright show-report` (only when reporter is "html" in playwright.config.js),
- `npx playwright test --project=webkit` (runs only webkit, but if uncommented in playwright.config.js),
- `npx playwright test --headed`,
- `npx playwright test --ui` (ui mode),
- `npx playwright test filename.spec.js` (test file has to be placed in test folder "testDir", as stated in playwright.config.js),
- `npx playwright test -g "name of the test"` (to run only one test from "describe/test" block"),

or npm run whateverComesFromScript (package.json), e.g.:
`"test": "playwright test --headed"`, (npm run test) (we can turn the headed mode on permanently in playwright-config.js => headless: false)
`"testheadless": "playwright test"`, (npm run testheadless)
`"testui": "playwright test --ui"`, (npm run testui)
`"test:ci": "playwright test`" (npm run test:ci)

## playwright installation

npm init playwright (or @latest / or e.g. @1.17.123) it will generate:

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

- playwright.config.js => `reporter: "line"`
- `await this.page.pause()` => stops the execution at any moment in the code, which allows to inspect the tested page and adress the locators;
- Playwright Inspector => 'pick locator' (or console devtools);
- in config file default reporter is 'html', I changed it to: 'line';
- often use of waitFor() to assert that an element is visible before an action is performed on that element (better logs);

## Jak testować YT:

- code repository:
  https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

- playwright.config.js => `reporter: "html"` (opens this reporter automatically when test fails; if test passes => npx playwright show-report);
- `npx playwright codegen https://demo-bank.vercel.app/`;
- this will open tested page (by default in playwright's chromium) and Playwright's inspector;
- just perform any action (like logging in) on the tested page and test will be automatically written within Playwright's inspector;
- to stop this press RECORD on Playwright's inspector;
- RECORD can be used on Playwright's inspector at any time, not only with codegen functionality;
