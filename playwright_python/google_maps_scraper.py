import asyncio
import json

from playwright.async_api import Playwright, async_playwright
from playwright.async_api import TimeoutError as PlaywrightTimeoutError


async def extract_details(page):
    """
    Extracts the results information from the page

    Args:
        page: Playwright page object

    Returns:
        A list containing details of results as dictionary. The dictionary has
        title, review count, rating, address of various results
    """

    # defining selectors
    result_container_selector = 'div[role="article"]'
    title_selector = '.fontHeadlineSmall span'
    review_text_selector = '.ZkP5Je span'
    address_selector = 'div.W4Efsd div.W4Efsd:nth-of-type(1) span[jsinstance' \
                       '="*1"] span:not([aria-hidden="true"]):not([style' \
                       '*="none"])'
    phone_selector = 'div.W4Efsd div.W4Efsd:nth-of-type(2) span[jsins' \
                     'tance="*1"] span:not([aria-hidden="true"]):not([sty' \
                     'le*="none"])'

    results_parsed = []

    results = page.locator(result_container_selector)
    # iterating through all the displayed results
    for result_idx in range(await results.count()):
        # extracting individual results
        result_elem = results.nth(result_idx)
        # extracting the title
        title = await result_elem.locator(title_selector).inner_text()

        # extracting and cleaning review details
        review_raw = await result_elem.locator(
            review_text_selector).all_inner_texts()
        rating = float(review_raw[0])
        review_count = review_raw[1].replace('(', '').replace(')', '')

        # extracting address
        try:
            address = await result_elem.locator(address_selector).inner_text()
        except PlaywrightTimeoutError:
            # address may not be available
            address = None
        # extracting phone
        try:
            phone = await result_elem.locator(phone_selector).inner_text()
        except PlaywrightTimeoutError:
            # phone may not be available
            phone = None

        data = {
            'title': title,
            'review_count': review_count,
            'rating': rating,
            'address': address,
            'phone': phone
        }
        results_parsed.append(data)

    return results_parsed


async def run(playwright: Playwright) -> None:
    """
    Main function which launches browser instance and performs browser
    interactions

    Args:
        playwright: Playwright instance
    """
    browser = await playwright.chromium.launch(
        headless=False,
        proxy={'server': 'proxy url here'}
    )
    context = await browser.new_context()

    # overriding timeout
    context.set_default_timeout(100000)

    search_term = "dentist in New York City, NY, USA"

    # Open new page
    page = await context.new_page()

    # Go to https://www.google.com/maps/
    await page.goto("https://www.google.com/maps/")

    # Click [aria-label="Search Google Maps"]
    await page.locator("[aria-label=\"Search Google Maps\"]").click()

    # Fill input[name="q"]
    await page.locator("input[name=\"q\"]").fill(search_term)

    # click search button
    await page.locator("button[id=\"searchbox-searchbutton\"]").click()

    # waiting for results to be displayed on the page
    await page.wait_for_selector('div[role="article"]')

    results = await extract_details(page)

    # saving the data
    with open('restaurant_data.json', 'w') as f:
        json.dump(results, f, indent=2)

    # ---------------------
    await context.close()
    await browser.close()


async def main() -> None:
    async with async_playwright() as playwright:
        await run(playwright)


asyncio.run(main())
