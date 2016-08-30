'use strict';
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

let scripts = ['./server.js', './lib/*.js', './test/*.js', './model/*.js', './route/*.js'];
let testFiles = ['./test/*.js'];
gulp.task('lint', () => {
  gulp.src(scripts)
    .pipe(eslint())
    .pipe(eslint.format());
});
gulp.task('test', () => {
  return gulp.src(testFiles)
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['lint', 'test']);
