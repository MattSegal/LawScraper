from __future__ import unicode_literals

from bs4 import BeautifulSoup, NavigableString
import json
import time
import re
import codecs

import scraper

URL = 'http://www.austlii.edu.au'


def main():
    # Read state and court info
    db_html_text = scraper.get_database_page(False)
    state_map = parse_database_page(db_html_text)

    with open('data/state-courts.json', 'w') as f:
        json.dump(state_map, f, indent=2)

    year_map = {
        court_slug: parse_court_page(court_html) 
        for court_slug, court_html 
        in scraper.get_court_pages(False, state_map)
    }

    with open('data/court-years.json', 'w') as f:
        json.dump(year_map, f, indent=2)

    year_page_gen = scraper.get_court_year_pages(False, state_map, year_map)
    for state_slug, court_slug, year, text in year_page_gen:
        if state_slug != 'vic':
            continue
        court_url = state_map[state_slug]['courts'][court_slug]['url']
        year_cases = parse_year_page(text, court_url)
        try:
            state_map[state_slug]['courts'][court_slug]['years'][year] = year_cases
        except KeyError:
            state_map[state_slug]['courts'][court_slug]['years'] = {}

    with codecs.open('data/cases.json', 'w', encoding="utf-8") as f:
        json.dump(state_map, f, indent=2)


def parse_database_page(text):
    """
    Reads all the states and their courts from the
    AustLII database page HTML
    """
    soup = BeautifulSoup(text, 'html.parser')
    table = soup.html.body.find_all('table')[1]
    
    stupid_names = ('atodraft', 'ato')
    ignored_courts = ('nz',)

    state_name_map = {
        a.attrs['name']: a.text
        for a in table.find_all('a')
        if (
            a.attrs.get('name') and 
            '_' not in a.attrs['name'] and 
            a.attrs['name'] not in ignored_courts and 
            a.attrs['name'] not in stupid_names
        )
     }

    # Get all 'a' tags
    def parse_class_name(class_name):
        return class_name[0].split('_')[0]

    courts = [
        li for li in table.find_all('li')
        if li.get('class') 
        and li.get('class')
    ]

    def parse_url(url):
        if 'www.nzlii.org' in url:
            return url
        return URL + url

    def parse_slug(url):
        return [s for s in url.split('/') if s][-1]

    def parse_name(name):
        # NSWOSR Duties Revenue Rulings 1998- => NSWOSR Duties Revenue Rulings
        return re.sub(r'\d+-\d*', '', name).strip() 

    def build_state(slug, name):
        bad_court_links = (
            'ntlawhandbook',  # http://www.ntlawhandbook.org/
            'portsea',  # http://portsea.austlii.edu.au
        )
        return {
            'name': name,
            'courts': {
                parse_slug(li.a.attrs['href']): {
                    'name': parse_name(li.a.text),
                    'url': parse_url(li.a.attrs['href']),
                } for li in courts
                if parse_class_name(li['class']) == slug
                and not any (
                    word in li.a.attrs['href'] 
                    for word in  bad_court_links
                )
                # Ignore legislation etc - cases only
                and '/cases/' in li.a.attrs['href']
            }
        }

    state_map = {
        slug: build_state(slug, name) 
        for slug, name in state_name_map.items()
    }
    return state_map


def parse_court_page(text):
    soup = BeautifulSoup(text, 'html.parser')
    year_block = soup.html.body.find_all_next('blockquote')[1]
    years = [int(year.text) for year in year_block.find_all('a')]
    return years


def parse_year_page(text, root_url):
    def parse_url(url):
        return root_url + re.sub(r'\.\.\/', '', url)

    def parse_name(text):
        return text.split('[')[0].strip()

    def parse_date(text):
        match = re.search(r'\(\d{1,2}\s{1}\S+\s{1}\d{4}\)', text)
        if not match:
            return None
        date =  match.group().strip('()').split(' ')
        date[1] = str(time.strptime(date[1][:3], '%b').tm_mon)
        return '/'.join(date)

    soup = BeautifulSoup(text, 'html.parser')
    year_cases = []
    for ul in soup.html.body.find_all_next('ul'):
        for a in ul('a'):
            year_cases.append({
                'name':parse_name(a.text),
                'url': parse_url(a.get_attribute_list('href')[0]),
                'date': parse_date(a.text),
            })
    return year_cases


if __name__ == '__main__':
    main()
