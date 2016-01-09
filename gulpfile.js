var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var Builder = require('systemjs-builder');
var plumber = require('gulp-plumber');

var paths = {
  sass: ['./src/**/*.{scss,sass}'],
  js: ['./src/**/*.js'],
  html: ['./src/**/*.html'],
  fonts: ['./jspm_packages/**/*.{eot,svg,ttf,woff}']
};

gulp.task('default', ['sass','js','html', 'fonts']);

gulp.task('sass', function(done) {
  gulp.src('./src/app.sass')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./www/'))
    .on('end', done);
});

gulp.task('js', function(done) {
  var b = new Builder();
  var buildConfig = {
    sourceMaps: true,
    lowResSourceMaps: true
  };

  // if (process.env.NODE_ENV === 'production') {
  //   buildConfig.minify = true;
  //   console.log('Minifying js');
  //
  b.loadConfig('./config.js')
  .then(function() {
    b.buildStatic('./src/app', './www/app.js', buildConfig)
    .then(function() {
      done();
    });
  })
  .catch(function(error) {
    console.log(error);
    process.exit(1);
  });
});

gulp.task('html', function() {
  gulp.src(paths.html)
  .pipe(gulp.dest('./www/'));
});

gulp.task('fonts', function() {
  gulp.src(paths.fonts)
  .pipe(flatten())
  .pipe(gulp.dest('./www/fonts'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
