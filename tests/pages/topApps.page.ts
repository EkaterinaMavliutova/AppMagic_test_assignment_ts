import BasePage from './base.page';
import Filters from '../components/filters.component';
import { type Page } from '@playwright/test';

export default class TopAppsPage extends BasePage {
  readonly filters: Filters;
  
  constructor(page: Page) {
    super(page);
    this.filters = new Filters(this.page);
  }
}
