import { Locator, TestInfo } from "@playwright/test";

const attachScreenshotToReport = async (locator: Locator, name: string, testInfo: TestInfo) => {
  const screenshot = await locator.screenshot();

  await testInfo.attach(name, {
    body: screenshot,
    contentType: "image/png",
  });
};

export default attachScreenshotToReport;
