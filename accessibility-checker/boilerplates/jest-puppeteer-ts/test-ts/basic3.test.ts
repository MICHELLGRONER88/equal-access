'use strict';

import * as Puppeteer from "puppeteer";
import { beforeAll, afterAll, describe, expect, test} from '@jest/globals';

const path = require("path");

let browser;

beforeAll(async () => {
    try {
        browser = await Puppeteer.launch();
    } catch (e) {
        console.log(e);
    }
    return Promise.resolve();
});

afterAll(async() => {
    await browser.close();
    return Promise.resolve();
});

// Describe this Suite of testscases, describe is a test Suite and 'it' is a testcase.
describe("Hello World Basics", () => {
    for (let idx=0; idx<50; ++idx) {
        test(`Multithread ${idx}`, async () => {
            let page = await browser.newPage();
            await page.goto("about:blank");
            await page.evaluate(() => {
                document.body.innerHTML = "<main><h1>Test</h1><div><img src='hello.png' alt='' /></div></main>";
                document.documentElement.lang = "en-US";
                document.title = "Test";
            })
            await (expect(page) as any).toBeAccessible(`MULTI${idx}`);
        });    
    }
});
