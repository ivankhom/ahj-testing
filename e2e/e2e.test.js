import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('page loads and shows input and button', async () => {
    await page.goto(baseUrl);
    const input = await page.$('.card-input');
    const button = await page.$('.card-btn');
    expect(input).not.toBeNull();
    expect(button).not.toBeNull();
  });

  test('valid Visa card shows success result', async () => {
    await page.goto(baseUrl);
    await page.type('.card-input', '4111111111111111');
    await page.click('.card-btn');
    await page.waitForSelector('.card-result--valid');
    const text = await page.$eval('.card-result', (el) => el.textContent);
    expect(text).toContain('✓');
  });

  test('invalid card number shows error result', async () => {
    await page.goto(baseUrl);
    await page.type('.card-input', '1234567890123456');
    await page.click('.card-btn');
    await page.waitForSelector('.card-result--invalid');
    const text = await page.$eval('.card-result', (el) => el.textContent);
    expect(text).toContain('✗');
  });

  test('typing Visa number highlights visa icon', async () => {
    await page.goto(baseUrl);
    await page.type('.card-input', '4111');
    const isActive = await page.$eval('[data-type="visa"]', (el) => el.classList.contains('card-icon--active'));
    expect(isActive).toBe(true);
  });

  test('typing Mastercard number highlights mastercard icon', async () => {
    await page.goto(baseUrl);
    await page.type('.card-input', '5500');
    const isActive = await page.$eval('[data-type="mastercard"]', (el) => el.classList.contains('card-icon--active'));
    expect(isActive).toBe(true);
  });
});
