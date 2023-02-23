# Google Maps Scraper using Playwright Javascript

 Step 1:  Clone/download the repo to your local system.

Step 2: cd into the `playwright_javascript` directory.

Step 3: Install the requirements.txt using  
>`npm install`

Step 4: Install the necessary browsers required for playwright 
>`playwright install`

Step 5: Run the scraper code using
>` node google_maps_scraper.js`

The results will be stored into a `data.json` in your project directory.
Using the search_term as `dentist in New York City, NY, USA` we get the sample data shown below.
```json
    {
        "title": "Glenn Reit DDS - Upper East Side Dentist",
        "reviewCount": "15",
        "rating": "4.7",
        "address": "1498 3rd Ave",
        "phone": "+1 212-517-9000"
    },
    {
        "title": "Wally Health - Tribeca",
        "reviewCount": "49",
        "rating": "4.9",
        "address": "249 Church St",
        "phone": null
    },
    {
        "title": "Expert Dental PC",
        "reviewCount": "960",
        "rating": "4.6",
        "address": "110 E 40th St #104",
        "phone": "+1 212-682-2965"
    },
    {
        "title": "New York Dental Office",
        "reviewCount": "279",
        "rating": "4.9",
        "address": "245 E 63rd St #110",
        "phone": "+1 212-548-3261"
    },
    {
        "title": "Midtown Dental Care Associates",
        "reviewCount": "360",
        "rating": "5.0",
        "address": "12 E 41st St Suite 1100",
        "phone": "+1 212-685-4730"
    },
    {
        "title": "Midtown Dental Excellence",
        "reviewCount": "148",
        "rating": "4.7",
        "address": "515 Madison Ave Suite #3303",
        "phone": "+1 917-746-3328"
    },
    {
        "title": "Astor Smile Dental",
        "reviewCount": "52",
        "rating": "5.0",
        "address": "53 W 11th St g",
        "phone": "+1 212-254-0800"
    },
    {
        "title": "Gramercy Dental NYC",
        "reviewCount": "55",
        "rating": "4.9",
        "address": "8 Gramercy Pk S #1b",
        "phone": "+1 212-614-2662"
    }
```

<br>

### To collect data from Google Maps on scale and without code visit [Scrapehero Cloud](https://www.scrapehero.com/marketplace/google-maps-search-results/).

<br>

### More resources on scraping and other related topics can be found [here](https://www.scrapehero.com/articles/).
