# General info:

## Artem App

- https://github.com/bondar-artem/pw-practice-app,
- clone pw-practice-app (to a separate folder),
- create/go to e.g. ArtemApp/pw-practice-app directory,
- npm install (--force),
- npm init playwright@latest (--force),

- to run local server => `npm start`
- to open app => `localhost:4200`

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
- `npx playwright test --debug` (it's like headed mode, with browser and inspector, but allows to execut code step by step to debug),

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

# various testing hints

- playwright.config.js => `reporter: "line"` or `"html"`;
- `await this.page.pause()` => stops the execution at any moment;
- Playwright Inspector => 'pick locator' (or console devtools);
- use of `waitFor()` to assert that an element is visible before an action is performed on that element (better logs);
- `npx playwright codegen https://demo-bank.vercel.app/` (to record tests);
- RECORD can be used on Playwright's inspector at any time, not only with codegen functionality;


