var scraper = require('./scraper');
var fetcher = require('./fetcher');

var REDDIT_URL = 'http://reddit.com/r/EarthPorn/';

// scrape Reddit for images!
scraper.scrapeImageURLs(REDDIT_URL, '.thumbnail', function(urls) {
  console.log('Extracted URLs:', urls);
  fetcher.fetchImages(__dirname + '/images', urls);
});
