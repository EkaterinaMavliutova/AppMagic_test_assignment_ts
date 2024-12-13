import { type Page } from '@playwright/test';
import BasePage from '../pages/base.page';
import CountrySelector from './countrySelector.component';

export default class Filters extends BasePage {
  readonly country: CountrySelector;
  
  constructor(page: Page) {
    super(page);
    this.country = new CountrySelector(this.page);
  }
}
