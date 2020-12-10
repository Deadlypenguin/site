/* global bulmaCarousel */

const axios = require('axios');
const jQuery = require('jquery');

const FLICKR_API_KEY = '6b11576331fc0406bbb316a06ae26061';

/**
 * Gets the Flickr URL for a given photoset
 * @param {String} photoset The photoset id
 * @returns {String} The Flickr URL
 */
function getFlickrUrl(photoset) {
    return `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${FLICKR_API_KEY}&photoset_id=${photoset}&extras=url_t%2Curl_s%2Curl_m%2Curl_l%2Curl_o%2Cdescription%2Cpath_alias&media=photos&format=json&nojsoncallback=1`;
}

/**
 * Output the photos to the dom to prepare the carousel
 * @param {Object} response The axios response
 * @returns {Promise} A promise for when the photos have been outputted
 */
function outputPhotosToDOM(response) {
    return new Promise(function (resolve) {
        const carousel = jQuery('#carousel');
        const gallery = jQuery('#gallery');

        if (!response.data.photoset) {
            resolve();
        } else {
            response.data.photoset.photo.forEach((element, index) => {
                carousel.append(`<div class="level-item item-${index} has-text-centered"><img src="${element.url_m}" /></div>`);
                gallery.append(`<div class="column has-text-centered"><img src="${element.url_m}" /></div>`);
            });

            const carousel_opts = {
                loop: true,
                infinite: true,
                autoplay: true,
                slidesToScroll: 1,
                slidesToShow: 1
            };

            bulmaCarousel.attach('#carousel', carousel_opts);

            resolve();
        }
    });
}

/**
 * Gets the photos and loads them into the page and calls the carousel methods
 * @param {String} photoset The photoset id
 * @returns {undefined}
 */
function getPhotos(photoset) {
    axios.get(getFlickrUrl(photoset))
        .then(outputPhotosToDOM)
        .catch(console.error);
}

window.getPhotos = getPhotos;