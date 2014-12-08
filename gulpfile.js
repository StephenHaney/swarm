(function() {
'use strict';

    function handleError(err) {
        console.log(err.toString());
        gutil.beep();
    }

    var gulp = require('gulp');
    var sass = require('gulp-ruby-sass');
    var autoprefixer = require('gulp-autoprefixer');
    var minifycss = require('gulp-minify-css');
    var jshint = require('gulp-jshint');
    var uglify = require('gulp-uglify');
    var order = require("gulp-order");
    var imagemin = require('gulp-imagemin');
    var rename = require('gulp-rename');
    var concat = require('gulp-concat');
    var notify = require('gulp-notify');
    var cache = require('gulp-cache');
    var plumber = require('gulp-plumber');
    //var livereload = require('gulp-livereload');
    var del = require('del');
    var gutil = require('gulp-util');

    gulp.task('styles', function() {
        return gulp.src('dev/sass/main.scss')
            .pipe(plumber({ errorHandler: handleError }))
            .pipe(sass({ style: 'expanded', 'sourcemap=none': true }))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            //.pipe(gulp.dest('dist/css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('deploy/css'))
            .pipe(notify({ message: 'Styles task complete' }));
    });

    gulp.task('scripts', function() {
        return gulp.src('dev/js/**/*.js')
            .pipe(plumber({ errorHandler: handleError }))
            .pipe(order([
                'main.js',
                'hero.js',
                '**/*.js'
              ]))
            //.pipe(jshint('.jshintrc'))
            //.pipe(jshint.reporter('default'))
            .pipe(concat('main.js'))
            //.pipe(gulp.dest('dist/js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('deploy/js'))
            .pipe(notify({ message: 'Scripts task complete' }));
    });

    gulp.task('scripts-libs', function() {
        return gulp.src('dev/libs/**/*.js')
            .pipe(plumber({ errorHandler: handleError }))
            .pipe(concat('libs.js'))
            //.pipe(gulp.dest('dist/js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('deploy/js'))
            .pipe(notify({ message: 'Scripts-libs task complete' }));
    });

    gulp.task('images', function() {
         return gulp.src('dev/img/**/*')
            .pipe(plumber({ errorHandler: handleError }))
            .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
            .pipe(gulp.dest('deploy/img'))
            .pipe(notify({ message: 'Images task complete' }));
    });

    gulp.task('clean', function(cb) {
        del(['dist/css', 'dist/js', 'dist/img'], cb);
    });

    gulp.task('default', ['clean'], function() {
        gulp.start('styles', 'scripts', 'scripts-libs', 'images');
    });

    gulp.task('watch', function() {
          // Watch .scss files
          gulp.watch('dev/sass/**/*.scss', ['styles']);
          // Watch .js files
          gulp.watch('dev/js/**/*.js', ['scripts']);
          // WAtch js libs
          gulp.watch('dev/libs/**/*.js', ['scripts-libs']);
          // Watch image files
          gulp.watch('dev/img/**/*', ['images']);
    });
})();