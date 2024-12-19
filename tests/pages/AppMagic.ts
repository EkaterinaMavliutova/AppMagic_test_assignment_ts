import { type Page } from '@playwright/test';
import BasePage from './base.page';
import TopAppsPage from './topApps.page';

export default class AppMagic extends BasePage {
  readonly topApps: TopAppsPage;

  constructor(page: Page) {
    super(page);
    this.topApps = new TopAppsPage(this.page);
  }
}
