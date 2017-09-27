# LawScraper

Proof of concept for improved AustLII interface.

When I made this page the [AustLII](http://www.austlii.edu.au/) interface was pretty old an hard to use.
I wanted to see if I could make it easier to access indexed court cases.

I scraped AustLII's index (once), whacked the results in S3 and used some custom React middleware to fetch the S3 JSON blobs
as require.

Learnings:

* You can put static JSON in S3 and hit it like it's a JSON API
* You can lazy load assets with React middleware
* It's hard to build an intuitive text search interface
* Create-react-app is amazing

Failings

* Lawyers (end users) kind of like the site, but don't think that it is preferred to their current workflow
* No debouncing on court case title field leads to wasteful computation and degraded UX
