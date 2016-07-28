'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

let testFiles = ['./test/*.js'];
var scriptFiles = ['./*.js', './lib/*.js', './controller/*.js', './model/*.js', './route/*.js'];

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp.src(testFiles)
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('watch', () => {
  gulp.watch([scriptFiles, testFiles], ['lint', 'test']);
});

gulp.task('default', ['start', 'watch', 'lint', 'test']);
