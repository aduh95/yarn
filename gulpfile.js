'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const log = require('fancy-log');
const { argv } = require('yargs');

const build = exports.build = () =>
  gulp
    .src('src/**/*.js')
    .pipe(
      plumber({
        errorHandler(err) {
          log.error(err.stack);
        },
      })
    )
    .pipe(newer('lib'))
    .pipe(gulpif(argv.sourcemaps, sourcemaps.init()))
    .pipe(babel())
    .pipe(
      gulpif(argv.sourcemaps, sourcemaps.write('.', { sourceRoot: '../src' }))
    )
    .pipe(gulp.dest('lib'));

exports.watch = gulp.series(build, () => gulp.watch('src/**/*', build));

exports.default = build;
