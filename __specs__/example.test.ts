import { chromium, Browser, Page, BrowserContext } from "playwright";

let page: Page;
let browser: Browser;
let context: BrowserContext;

describe("Test Playwright - TS", () => {
  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({ viewport: null });
    page = await context.newPage();

    await page
      .goto("https://whatismybrowser.com/", {
        waitUntil: "networkidle",
      })
      .catch(() => {});
  });

  it("should load without error", async () => {
    const browser = await page.$eval(".string-major a", (el: any) => el.text);
    expect(browser).toContain("Chrome");
  });

  afterAll(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });
});
