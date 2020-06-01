/*
 * @Author: ryuusennka
 * @Date: 2020-06-01 09:09:31
 * @LastEditors: ryuusennka
 * @LastEditTime: 2020-06-01 12:00:10
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

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: __dirname,
      directory: true,
      index: 'index.html',
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

const js = () =>
  gulp
    .src('demo/**/*.babel.js')
    .pipe(babel())
    .pipe(
      rename(path => {
        console.log(path); // 看起来像{ dirname: '01', basename: 'index.babel', extname: '.js' }
        return {
          dirname: path.dirname,
          basename: path.basename.substr(0, path.basename.length - 6),
          extname: '.js',
        };
      })
    )
    .pipe(gulp.dest('demo'))
    .pipe(browsersync.stream());
const css = () => {
  const plugins = [autoprefixer, cssnano];
  return gulp
    .src('demo/**/*.scss')
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
    .pipe(gulp.dest('demo'))
    .pipe(browsersync.stream());
};

const watchFile = () => {
  gulp.watch('demo/**/*.scss', gulp.series(css, browserSyncReload));
  gulp.watch('demo/**/*.babel.js', gulp.series(js, browserSyncReload));
  gulp.watch('demo/**/*.html', browserSyncReload);
};
const build = gulp.parallel(js, css);
const watch = gulp.parallel(watchFile, browserSync);

module.exports = { js, css, build, watch };
