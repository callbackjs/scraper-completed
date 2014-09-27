var request = require('request');
var pathLib = require('path');
var fs = require('fs');
var mime = require('mime');

var IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

/* Fetch images from the given URLs into the provided directory.
 *
 * Arguments:
 * directory -- the directory to put the images in
 * urls -- an array of URLs to fetch images from
 */
exports.fetchImages = function(directory, urls) {
  urls.forEach(function(url, index) {
    // ignore relative URLs
    if (url[0] === '/') {
      return;
    }

    fetchSingleImage(url, directory, '' + index);
  });
};

/* Fetch an image given by the provided URL. Store the result in a file with
 * name "[prefix].[extension]", where [prefix] is the provided prefix and
 * [extension] is the correct extension of the fetched image.
 *
 * Arguments:
 * url -- the URL to fetch the image from
 * directory -- the directory to fetch the file into
 * prefix -- the prefix of the file name
 */
function fetchSingleImage(url, directory, prefix) {
  console.log('Fetching ' + url);

  // timeout in 5s to avoid long waiting
  request.get({ url: url, timeout: 5000, encoding: null },
    function(error, response, body) {
      if (error || response.statusCode !== 200) {
        console.log('Could not fetch ' + url);
        return;
      }

      // find appropriate extension
      var contentType = response.headers['content-type'];
      var extension = mime.extension(contentType);

      // save image
      if (IMAGE_EXTENSIONS.indexOf(extension) !== -1) {
        var path = pathLib.join(directory, prefix + '.' + extension);
        fs.writeFileSync(path, body);
      }
    });
}
