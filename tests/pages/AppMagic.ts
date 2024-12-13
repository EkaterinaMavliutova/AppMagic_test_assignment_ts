import { type Page } from '@playwright/test';
import BasePage from './base.page';
import TopAppsPage from './topApps.page';

export default class AppMagic extends BasePage {
  readonly topApps: TopAppsPage; // это правильно??? мы же класс импортируем, а не тип

  constructor(page: Page) { //почему снова нужно тип Page импортировать, если он уже в basepage???
    super(page); // тут не нужна типизация???
    this.topApps = new TopAppsPage(this.page);
  }
}
