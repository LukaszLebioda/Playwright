# installation

npm init playwright (or @latest / or @1.17.123) it will generate:

- node_modules (npm i / npm install not needed),
- package.json & package-lock.json (npm init / npm init -y not needed),
- .gitignore,
- test-examples folder (not needed, to be removed),
- tests folder (we can change test destination folder name in config file),

# testing ways

1. playwright test --headed

- we add 'await this.page.pause()' to stop execution at any moment in our code to debug,
- in Playwright Inspector we can choose 'pick locator' (instead of regular console - elements),
- in config file default reporter is 'html', I changed it to: 'line';
