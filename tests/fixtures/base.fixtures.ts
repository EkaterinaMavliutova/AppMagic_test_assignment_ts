import { test as base } from '@playwright/test';
import AppMagic from '../pages/AppMagic';
import BasePage from 'tests/pages/base.page';

export const test = base.extend<{ appMagic: AppMagic }>({
  appMagic: async ({ page }, use) => {
    const appMagic = new AppMagic(page);
    await page.goto('./top-charts/apps');
    await use(appMagic);
  },
});

export function step(stepName?: string) {
  return function decorator(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: (args?: any) => Promise<any>,
    context: ClassMethodDecoratorContext,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function replacementMethod(this: BasePage, ...args: any) {
      const name = stepName || context.name as string;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
};
