/*
 * @Author: ryuusennka
 * @Date: 2020-06-01 09:09:31
 * @LastEditors: ryuusennka
 * @LastEditTime: 2020-06-04 15:37:26
 * @FilePath: /fedemo/gulpfile.js
 * @Description:
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync').create();
const ejs = require('gulp-ejs');
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: resolve('dist'),
      directory: true,
      // index: 'index.html',
    },
    port: 3010,
    ignore: ['gulpfile.js', 'package.json', 'yarn.lock', 'node_modules/'],
  });
  done();
}
// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}
const jsSrc = ['src/**/*.js', '!src/assets/**/*.js'];
const js = () =>
  gulp
    .src(jsSrc)
    .pipe(babel())
    .pipe(
      rename(path => {
        // console.log(path); // 看起来像{ dirname: '01', basename: 'index.babel', extname: '.js' }
        return {
          dirname: path.dirname,
          basename: path.basename,
          extname: '.js',
        };
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream());

const cssSrc = ['src/**/*.scss'];
const css = () => {
  const plugins = [autoprefixer, cssnano];
  return gulp
    .src(cssSrc)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(
      rename(path => ({
        dirname: path.dirname,
        basename: path.basename,
        extname: '.css',
      }))
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream());
};

const ejstempSrc = 'src/**/index.ejs';
const ejstemp = () =>
  gulp
    .src(ejstempSrc)
    .pipe(ejs())
    .pipe(
      rename(path => ({
        dirname: path.dirname,
        basename: path.basename,
        extname: '.html',
      }))
    )
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream());

const copySrc = ['src/assets/**', '!**/*.scss'];
const copy = () =>
  gulp.src(copySrc).pipe(gulp.dest('dist/assets')).pipe(browsersync.stream());

const watchFile = () => {
  gulp.watch(cssSrc, gulp.series(css, browserSyncReload));
  gulp.watch(jsSrc, gulp.series(js, browserSyncReload));
  gulp.watch(ejstempSrc, gulp.series(ejstemp, browserSyncReload));
  gulp.watch(copySrc, gulp.series(copy, browserSyncReload));
};
const build = gulp.parallel(js, css, ejstemp, copy);
const watch = gulp.parallel(watchFile, browserSync);

module.exports = { js, css, ejstemp, copy, build, watch };

// 测试 npx gulp js,npx gulp css, ...
