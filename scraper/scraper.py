from __future__ import unicode_literals

import os
import codecs

import requests


URL = 'http://www.austlii.edu.au'
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
}
DATABASE_HTML_FILE = 'html/databases.html'


def get_database_page(scrape):
    """
    Read database list HTML from AustLII
    """
    if scrape:
        ensure_dir('html')
        r = requests.get(URL + '/databases.html', headers=HEADERS)
        text = r.text
        with open(DATABASE_HTML_FILE, 'w') as f:
            f.write(text)
    else:
        with open(DATABASE_HTML_FILE, 'r') as f:
            text = f.read()

    return text

       
def get_court_pages(scrape, state_map):
    """
    Read court page HTML from AustLII
    """
    for state_slug, state_data in state_map.items():
        ensure_dir('html/{}'.format(state_slug))
        for court_slug, court in state_data['courts'].items():
            ensure_dir('html/{}/{}'.format(state_slug, court_slug))
            court_page_file = 'html/{}/{}/index.html'.format(state_slug, court_slug)
            if scrape:
                print court['url']
                r = requests.get(court['url'], headers=HEADERS)
                text = r.text
                with open(court_page_file, 'w') as f:
                    f.write(text)
            else:
                with open(court_page_file, 'r') as f:
                    text = f.read()
            yield court_slug, text


def get_court_year_pages(scrape, state_map, year_map):
    """
    Read the HTML for a court's year page on AustLII
    """
    for state_slug, state_data in state_map.items():
        state_courts = state_data['courts']
        for court_slug, court in state_courts.items():
            years = year_map[court_slug]
            for year in years:
                year_page_file =  'html/{}/{}/{}.html'.format(state_slug, court_slug, year)
                if scrape:
                    year_url = '{}/{}/'.format(court['url'], year) 
                    r = requests.get(year_url, headers=HEADERS)
                    text = r.text
                    with codecs.open(year_page_file, 'w', encoding="utf-8") as f:
                        f.write(text)
                else:
                    with codecs.open(year_page_file, 'r', encoding="utf-8") as f:
                        text = f.read()

                # a bit much
                yield state_slug, court_slug, year, text
            

def ensure_dir(dir):
    if not os.path.exists(dir):
        os.makedirs(dir)