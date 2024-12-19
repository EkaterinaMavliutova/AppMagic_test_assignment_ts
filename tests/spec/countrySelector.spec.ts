import test from '../fixtures/base.fixtures';
import { expect } from '@playwright/test';
import { attachScreenshotToReport } from '../utils/utils';
import { faker } from '@faker-js/faker';

test('should be possible to choose country', async ({ appMagic: { topApps } }) => {
  await topApps.filters.country.open();
  await expect(topApps.filters.country.dropdown).toBeVisible();

  const {countryButton, countryName} = await topApps.filters.country.getRandomCountry();
  await topApps.filters.country.fillInput(countryName);
  await countryButton.click();

  await expect.poll(async () => {
    return await topApps.filters.country.getSelectedValue();
  }).toBe(countryName);
});

test('should be possible to clear input', async ({ appMagic: { topApps } }) => {
  await topApps.filters.country.open();
  await expect(topApps.filters.country.dropdown).toBeVisible();

  await topApps.filters.country.fillInput('anyText');
  await expect.poll(async () => {
    return await topApps.filters.country.getInputValue();
  }).toBe('anyText');

  await topApps.filters.country.clearInput();

  await expect(topApps.filters.country.input).toHaveAttribute('placeholder', topApps.filters.country.placeholderText);
});

test('shows message when no country match filled value', async ({ appMagic: { topApps } }, testInfo) => {
  await topApps.filters.country.open();
  await expect(topApps.filters.country.dropdown).toBeVisible();

  const countryList = await topApps.filters.country.getCountryList();
  const randomStr = faker.string.alphanumeric(10);

  const isNotCountry = countryList.every((item) => randomStr !== item);
  await topApps.filters.country.fillInput(randomStr);

  await expect.poll(async () => isNotCountry).toBeTruthy();
  await expect(topApps.filters.country.dropdown).toContainText(topApps.filters.country.noDataMessage);
  await attachScreenshotToReport(topApps.filters.country.dropdown, 'No data screenshot', testInfo);
});

test('should be possible to close selector by mouse click()', async ({ appMagic: { topApps } }) => {
  await topApps.filters.country.open();
  await expect(topApps.filters.country.dropdown).toBeVisible();

  await topApps.filters.country.closeByMouseClick();

  await expect(topApps.filters.country.dropdown).toBeHidden();
});

test('should be possible to close selector by keyboard click()', async ({ appMagic: { topApps } }) => {
  await topApps.filters.country.open();
  await expect(topApps.filters.country.dropdown).toBeVisible();

  await topApps.filters.country.closeByKeyboardClick();

  await expect(topApps.filters.country.dropdown).toBeHidden();
});

test("input should accept max 255 characters string", async ({ appMagic: { topApps } }) => {
  await topApps.filters.country.open();
  await expect(topApps.filters.country.dropdown).toBeVisible();
  
  const strOfExceededLength = faker.string.alphanumeric({ length: { min: 256, max: 300 } });
  await topApps.filters.country.fillInput(strOfExceededLength);
  const inputValue = await topApps.filters.country.getInputValue();

  await expect.poll(async () => inputValue).toHaveLength(255);
  await expect.poll(async () => inputValue).toBe(strOfExceededLength.slice(0, 255));
});
