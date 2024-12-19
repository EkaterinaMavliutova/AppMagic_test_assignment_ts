import { Locator, TestInfo } from "@playwright/test";
import BasePage from "tests/pages/base.page";
import test from '../fixtures/base.fixtures';

export const attachScreenshotToReport = async (locator: Locator, name: string, testInfo: TestInfo) => {
  const screenshot = await locator.screenshot();

  await testInfo.attach(name, {
    body: screenshot,
    contentType: "image/png",
  });
};

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
