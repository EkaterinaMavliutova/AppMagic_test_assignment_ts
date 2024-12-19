import { test as base } from '@playwright/test';
import AppMagic from '../pages/AppMagic';

const test = base.extend<{ appMagic: AppMagic }>({
  appMagic: async ({ page }, use) => {
    const appMagic = new AppMagic(page);
    await page.goto('./top-charts/apps');
    await use(appMagic);
  },
});

export default test;
