var request = require('request');
var cheerio = require('cheerio');

/* Scrapes the given URL for image links specified by the provided selector.
 * Calls the callback with a list of URLs.
 *
 * Arguments:
 * url -- the URL to scrape
 * selector -- the CSS selector that identifies the image links
 * callback -- the callback to call with the list of URLs
 */
exports.scrapeImageURLs = function(url, selector, callback) {
  request.get(url, function(error, response, html) {
    // exit on error or bad response code
    if (error) {
      throw error;
    }

    if (response.statusCode !== 200) {
      throw new Exception("Didn't get a 200 status code.");
    }

    callback(findImageURLs(html, selector));
  });
};


/* Finds image links in the given HTML that match the provided selector.
 * Returns a list of links.
 *
 * Arguments:
 * html -- the HTML to parse
 * selector -- the CSS selector that identifies the image links
 */
function findImageURLs(html, selector) {
  // parse the HTML jQuery-style
  var $ = cheerio.load(html);
  var urls = [];

  // image sources are the href's of .thumbnail anchors
  $(selector).each(function() {
    urls.push($(this).attr('href'));
  });

  return urls;
}
