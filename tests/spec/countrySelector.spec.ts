import { test } from '../fixtures/base.fixtures';
import { expect } from '@playwright/test';
import attachScreenshotToReport from '../utils/utils';
import { faker } from '@faker-js/faker';
import Filters from 'tests/components/filters.component';

let filters: Filters;

test.beforeEach(async ({ appMagic: { topApps } }) => {
  filters = topApps.filters;
});

test('should be possible to choose country', async () => {
  await filters.country.open();
  await expect(filters.country.dropdown).toBeVisible();

  const {countryButton, countryName} = await filters.country.getRandomCountry();
  await filters.country.fillInput(countryName);
  await countryButton.click();

  await expect.poll(async () => {
    return await filters.country.getSelectedValue();
  }).toBe(countryName);
});

test('should be possible to clear input', async () => {
  await filters.country.open();
  await expect(filters.country.dropdown).toBeVisible();

  await filters.country.fillInput('anyText');
  await expect.poll(async () => {
    return await filters.country.getInputValue();
  }).toBe('anyText');

  await filters.country.clearInput();

  await expect(filters.country.input).toHaveAttribute('placeholder', filters.country.placeholderText);
});

test('should show message when no country match filled value', async ({}, testInfo) => {
  await filters.country.open();
  await expect(filters.country.dropdown).toBeVisible();

  const countryList = await filters.country.getCountryList();
  const randomStr = faker.string.alphanumeric(10);

  const isNotCountry = countryList.every((item) => randomStr !== item);
  await filters.country.fillInput(randomStr);

  await expect.poll(async () => isNotCountry).toBeTruthy();
  await expect(filters.country.dropdown).toContainText(filters.country.noDataMessage);
  await attachScreenshotToReport(filters.country.dropdown, 'No data screenshot', testInfo);
});

test('should be possible to close selector by mouse click()', async () => {
  await filters.country.open();
  await expect(filters.country.dropdown).toBeVisible();

  await filters.country.closeByMouseClick();

  await expect(filters.country.dropdown).toBeHidden();
});

test('should be possible to close selector by keyboard click()', async () => {
  await filters.country.open();
  await expect(filters.country.dropdown).toBeVisible();

  await filters.country.closeByKeyboardClick();

  await expect(filters.country.dropdown).toBeHidden();
});

test("input should accept max 255 characters string", async () => {
  await filters.country.open();
  await expect(filters.country.dropdown).toBeVisible();
  
  const strOfExceededLength = faker.string.alphanumeric({ length: { min: 256, max: 300 } });
  await filters.country.fillInput(strOfExceededLength);
  const inputValue = await filters.country.getInputValue();

  await expect.poll(async () => inputValue).toHaveLength(255);
  await expect.poll(async () => inputValue).toBe(strOfExceededLength.slice(0, 255));
});
