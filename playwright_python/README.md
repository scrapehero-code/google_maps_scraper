# Google Maps Scraper using Playwright Python

 Step 1:  Clone/download the repo to your local system.

Step 2: cd into the `playwright_python` directory.

Step 3: Install the requirements.txt using  
>` pip install -r requirements.txt`

Step 4: Install the necessary browsers required for playwright 
>`playwright install`

Step 5: Run the scraper code using
>` python google_maps_scraper.py`

The results will be stored into a `restaurant_data.json` in your project directory. 
Using the search_term as `dentist in New York City, NY, USA` we get the sample data shown below.

```
  {
    "title": "Zendentistry",
    "review_count": "57",
    "rating": 4.9,
    "address": "217 Broadway suite 612",
    "phone": "(646) 604-5700"
  },
  {
    "title": "Leaf Dental",
    "review_count": "426",
    "rating": 4.9,
    "address": "18 Adams St",
    "phone": "(718) 285-3035"
  },
  {
    "title": "New York Dental Office",
    "review_count": "278",
    "rating": 4.9,
    "address": "245 E 63rd St #110",
    "phone": "(212) 548-3261"
  },
  {
    "title": "Expert Dental PC",
    "review_count": "941",
    "rating": 4.6,
    "address": "110 E 40th St #104",
    "phone": "(212) 682-2965"
  },
  {
    "title": "Central Park Dentistry",
    "review_count": "79",
    "rating": 4.8,
    "address": "30 Central Park S #2C-2B",
    "phone": "(212) 486-6211"
  },
  {
    "title": "SoHo Dental Group",
    "review_count": "333",
    "rating": 4.9,
    "address": "552 Broadway #505",
    "phone": "(646) 849-1737"
  },
  {
    "title": "Astor Smile Dental",
    "review_count": "52",
    "rating": 5.0,
    "address": "53 W 11th St g",
    "phone": "(212) 254-0800"
  },
  {
    "title": "Central Park West Dentistry",
    "review_count": "108",
    "rating": 4.8,
    "address": "25 W 68th St #1a",
    "phone": "(212) 579-8885"
  }
```
<br>
<br>
<br>
### To collect data from Google Maps on scale and without coding visit [Scrapehero Cloud](https://www.scrapehero.com/marketplace/google-maps-search-results/)
<br>
### More resources on scraping and other related topics can be found [here](https://www.scrapehero.com/articles/).
