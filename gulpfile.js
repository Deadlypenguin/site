const gulp = require('gulp');

const clean = require('./gulp/clean');
const css = require('./gulp/css').default;
const html = require('./gulp/html').default;
const img = require('./gulp/img').default;
const js = require('./gulp/js').default;
const sass = require('./gulp/sass').default;
const sitemap = require('./gulp/sitemap');
const static_files = require('./gulp/static');
const watch = require('./gulp/watch');

const parallel_jobs = [
    css,
    html,
    img,
    js,
    sass
];

if (static_files.has.css()) {
    parallel_jobs.push(static_files.css);
}

if (static_files.has.js()) {
    parallel_jobs.push(static_files.js);
}

gulp.task('build', gulp.series(gulp.parallel(parallel_jobs), sitemap));
const build = gulp.task('build');

gulp.task('watch', gulp.series(clean, build, watch));

exports.default = gulp.series(clean, build);