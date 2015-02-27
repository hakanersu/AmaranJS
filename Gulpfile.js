/**
 * AmaranJS Gulpfile.js
 * */
var gulp            = require("gulp"),
    sass            = require("gulp-ruby-sass"),
    autoprefixer    = require("gulp-autoprefixer"),
    rename          = require('gulp-rename'),
    minifycss       = require('gulp-minify-css'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    coffee          = require('gulp-coffee'),
    notify          = require('gulp-notify'),
    plumber         = require('gulp-plumber');

gulp.task('css', function() {
    return sass('src/sass/') 
        .on('error', function (err) {
            console.error('Error!', err.message);
    })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))    
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())    
    .pipe(concat('amaran.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify('All CSS Works Done!'));
});

// Gulp coffee task
gulp.task('js',function(){
     gulp.src("src/coffee/**/*.coffee")
         .pipe(plumber())
         .pipe(coffee())
         .pipe(concat('jquery.amaran.js'))
         .pipe(gulp.dest('dist/js'))
         .pipe(rename({ suffix: '.min' }))
         .pipe(uglify())
         .pipe(gulp.dest('dist/js'))
         .pipe(notify('All JS Works Done!'));
});

// Gulp watch task
gulp.task('watch',function(){
    gulp.watch('src/sass/**/*.sass',['css']);
    gulp.watch('src/coffee/**/*.coffee',['js']);
});

gulp.task('default',['css','js','watch']);