import { chromium, Browser, Page } from "playwright";

let page;
let browser;
let context;

describe("Test Playwright - JS", () => {
    beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext({ viewport: null });
        page = await context.newPage();
        await page
            .goto("https://whatismybrowser.com/", {
                waitUntil: "networkidle",
            })
            .catch(() => { });
    });

    test('should display "google" text on page', async () => {
        const browser = await page.$eval('.string-major', (el) => el.innerHTML)
        expect(browser).toContain('Chrome')
    });

    afterAll(() => {
        if (!page.isClosed()) {
            browser.close();
        }
    });
});