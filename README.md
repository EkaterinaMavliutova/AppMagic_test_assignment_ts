# Test assignment for AppMagic (TypeScript version)
[![Playwright Tests](https://github.com/EkaterinaMavliutova/AppMagic_test_assignment_ts/actions/workflows/playwright.yml/badge.svg)](https://github.com/EkaterinaMavliutova/AppMagic_test_assignment_ts/actions/workflows/playwright.yml)
### Task:
Write a test in JavaScript/Typescript using Playwright (the order of checks doesn't matter):
- Go to page https://appmagic.rocks/top-charts/apps.
- Open country selector.
- Find a country in the list (by filling in the input).
- Select the country.
- Clear the input by icon.
- Enter invalid data to the input (any value that is not a country from the list).
- Make a screenshot of the selector panel in the 'no data' state.
- Close the selector (with one or several methods).
- Check the maximum number of characters in the input (255).

## How to install and run tests
* Clone this repository.
* Install required dependencies:
```
npm i
```
* Run tests:
```
npm test
```