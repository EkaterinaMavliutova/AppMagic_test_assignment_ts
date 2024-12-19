import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BasePage from '../pages/base.page';
import { step } from '../utils/utils';

export default class CountrySelector extends BasePage {
  protected className: string;
  readonly element: Locator;
  readonly dropdown: Locator;
  readonly input: Locator;
  readonly clearInputButton: Locator;
  readonly countriesList: Locator;
  readonly outerArea: Locator;
  readonly noDataMessage: string;
  readonly placeholderText: string;
  
  constructor(page: Page) {
    super(page);
    this.className = 'CountrySelector';
    this.element = this.page.locator('css=selector:has-text("Geography")').locator('css=[clickelementref]');
    this.dropdown = this.page.locator('css=country-single-select-panel');
    this.input = this.dropdown.getByRole('textbox');
    this.clearInputButton = this.page.locator('css=.g-clear-search-icon');
    this.countriesList = this.dropdown.locator('css=div:has(> div.region-title:has-text("Countries"))').getByRole('button');
    this.outerArea = this.page.locator('css=div.am-dropdown-backdrop');
    this.noDataMessage = 'Nothing to display';
    this.placeholderText = 'Start typing country name...';
  }

  @step('Open country dropdown')
  async open() {
    await this.element.click();
  }

  @step('Close country dropdown with the mouse click to the outer area')
  async closeByMouseClick() {
    await this.outerArea.click();
  }

  @step('Close country dropdown with the ESC button')
  async closeByKeyboardClick() {
    await this.page.keyboard.press('Escape');
  }

  @step('Get names array of all countries from the dropdown')
  async getCountryList() {
    const countries = await this.countriesList.allTextContents();
    const countryNames = countries.map((item) => item.slice(2));

    return countryNames;
  }

  @step(`Get name and locator of the random country from the dropdown`)
  async getRandomCountry() {
    const countries = await this.countriesList.all();
    const countriesCount = countries.length;
    const randomIndex = faker.number.int({ max: countriesCount });
    const countryName = await countries[randomIndex].textContent() ?? '';
    const countryNameWithoutCode = countryName.slice(2);
    const countryLocator = this.countriesList.filter({ hasText: countryNameWithoutCode });

    return {
      countryButton: countryLocator,
      countryName: countryNameWithoutCode,
    };
  }

  @step('Get current selected country')
  async getSelectedValue() {
    const selectedValue = await this.element.locator('css=span.text-overflow').textContent();

    return selectedValue;
  }

  @step('Fill in the input in the country dropdown')
  async fillInput(countryName: string) {
    await this.input.fill(countryName);
  }

  @step('Clear the input in the country dropdown')
  async clearInput() { 
    await this.clearInputButton.click();
  }

  @step('Get current value in the input in the country dropdown')
  async getInputValue() {
    const inputValue = await this.input.inputValue();

    return inputValue;
  }
}
