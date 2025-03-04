## playwright installation

npm init playwright (or @latest / or e.g. @1.17.123) it will generate:

- node_modules (`npm i` / npm install not needed),
- package.json & package-lock.json (`npm init` / npm init -y not needed),
- .gitignore,
- test-examples folder (not needed, to be removed),
- tests folder (we can change test destination folder name in config file),

## Playwright update

- check installed version => `npx @playwright/test` --version,
- check installed, recommended, newest version => `npm outdated @playwright/test`,
- install new version => `npm i @playwright/test`,

## options to run tests

- `npx playwright test` (headless by default),
- `npx playwright show-report` (only when reporter is "html" in playwright.config.js),
  `npx playwright test --trace on` (only when reporter is "html" in playwright.config.js) (this will expand a regular html report with trace section; it's a sequence of snapshots with logs and can be used for debugging locally or in CI environment),
- `npx playwright test --project=webkit` (runs only webkit, but if uncommented in playwright.config.js),
- `npx playwright test --headed`,
- `npx playwright test --ui` (ui mode),
- `npx playwright test filename.spec.js` (test file has to be placed in test folder "testDir", as stated in playwright.config.js),
- `npx playwright test -g "name of the test"` (to run only one test from "describe/test" block"),
- `npx playwright codegen https://somewebsite.com/` (record the tests),
- `npx playwright test --debug` (it's like headed mode, with browser and inspector, but allows to execute code step by step to debug),

or npm run whateverComesFromScript (package.json), e.g.:
`"test": "playwright test --headed"`, (npm run test) (we can turn the headed mode on permanently in playwright-config.js => headless: false)
`"testheadless": "playwright test"`, (npm run testheadless)
`"testui": "playwright test --ui"`, (npm run testui)
`"test:ci": "playwright test`" (npm run test:ci)

## playwright documentation

https://playwright.dev/docs/api/class-page

every Playwright method returns:

- promise, e.g. `await page.goto("\")` (await is needed),
- locator, e.g. `page.getByRole('button')` (await not needed); locator is not a promise, so it can be assigned to a variable;
