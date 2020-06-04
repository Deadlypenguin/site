/* global bulmaCarousel */

const carousel_opts = {
    loop: true,
    infinite: true,
    autoplay: true,
    slidesToScroll: 1,
    slidesToShow: 1
};

bulmaCarousel.attach('#carousel', carousel_opts);