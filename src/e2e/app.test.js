import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("Tooltip form test initiation", () => {
  let browser;
  let page;
  let server = null;

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);

    browser = await puppetteer.launch({
      headless: true,
      args: [`--no-sandbox`, `--disable-setuid-sandbox`],
      slowMo: 50,
    });

    page = await browser.newPage();
  });

  describe("Popover on page", () => {
    beforeEach(async () => {
      await page.goto("http://localhost:8080");

      await page.waitForSelector(".popover-container");
    });

    test("Should show popover on click", async () => {
      await await page.locator(".btn").click();
      const element = await page.waitForSelector(".popover", { visible: true });
      expect(element).not.toBeNull();
    });

    test("Should remove popover on click", async () => {
      const btn = await page.locator(".btn");
      await btn.click();
      await btn.click();

      const element = await page.waitForSelector(".popover", { hidden: true });
      expect(element).toBeNull();

      // const popover = await page.$(".popover");
      // (await popover) === null;
      // await expect(page).not.toMatchElement(".popover");
    });

    afterAll(async () => {
      await browser.close();
      server.kill();
    });
  });
});
