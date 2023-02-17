// importing required modules
import fs from 'fs';
// initializing the required browser
import playwright from 'playwright';

/**
 * Open browser, goto given url and collect data
 */
async function run() {
  const browser = await playwright.chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    proxy: { server: 'http://ProxyIP:Port' }
  });
  // Open new page
  const page = await context.newPage();
  // Go to https://www.google.com/maps
  await page.goto('https://www.google.com/maps', { waitUntil: 'load' });
  // Click on search tab
  await page.locator('[aria-label="Search Google Maps"]').click();
  // Enter the search query
  await page.locator('[aria-label="Search Google Maps"]').type('restaurants near New York, NY, USA', { 'delay': 500 });
  // Press Enter after entering the query
  await page.locator('[aria-label="Search Google Maps"]').press('Enter');
  let ListingPageData = await extractDetails(page);
  // Save data as JSON
  const jsonData = JSON.stringify(ListingPageData);
  saveJSONFile(jsonData);
  // Closing browser context after use
  await context.close();
  await browser.close();
};

/**
 * Extract data from HTML content
 * @param page -  Page object
 * @returns {JSON} - Return collected data in JSON format
 */
async function extractDetails(page) {
  // Wait for results
  let listedProductSelector = 'div[role="article"]';
  await page.waitForSelector(listedProductSelector);
  let results = page.locator(listedProductSelector);
  // Now we need to collect details from HTML content.
  let ListingPageData = [];
  let resultCount = await results.count();
  // All the selectors used to collect data
  let reviewTextSelector = '.ZkP5Je span';
  let addressSelector = 'div.W4Efsd div.W4Efsd:nth-of-type(1) span[jsinstance="*1"] span:not([aria-hidden="true"]):not([style*="none"])';
  let phoneSelector = 'div.W4Efsd div.W4Efsd:nth-of-type(2) span[jsinstance="*1"] span:not([aria-hidden="true"]):not([style*="none"])';
  let titleSelector = `.fontHeadlineSmall span`;
  // Iterate through each search result and save data to a list variable
  for (let i = 0; i < resultCount; i++) {
    let resultElem = results.nth(i);
    let title = await resultElem.locator(titleSelector).innerText();
    let reviewRaw = await resultElem.locator(reviewTextSelector).allInnerTexts();
    let rating = reviewRaw[0];
    let reviewCount = reviewRaw[1].replace('(', '').replace(')', '');
    let address = null;
    let phone = null;
    try {
      address = await resultElem.locator(addressSelector).innerText();
    }
    catch (err) {
      console.log("Address was not found!");
    };
    try {
      phone = await resultElem.locator(phoneSelector).innerText();
    }
    catch (err) {
      console.log("Phone number was not found!");
    };
    let productData = {
      title: title,
      reviewCount: reviewCount,
      rating: rating,
      address: address,
      phone: phone
    };
    console.log(productData);
    ListingPageData.push(productData);
  };
  return ListingPageData;
};

/**
 * Save JSON data to .json file
 * @param jsonData -  Extracted data in JSON format
 */
async function saveJSONFile(jsonData) {
  fs.writeFile("data.json", jsonData, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    };

    console.log("JSON file has been saved.");
  });
};

run();
