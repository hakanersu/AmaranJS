/**
 * AmaranJS Gulpfile.js
 * */
var gulp            = require("gulp"),
    sass            = require("gulp-ruby-sass"),
    autoprefixer    = require("gulp-autoprefixer"),
    rename          = require('gulp-rename'),
    minifycss       = require('gulp-minify-css'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify');



// Gulp coffee task
gulp.task('js',function(){
     gulp.src("src/js/*.js")
         .pipe(concat('amaran.js'))
         .pipe(rename({ suffix: '.min' }))
         .pipe(uglify())
         .pipe(gulp.dest('dist/js'))
         .pipe(notify('All JS Works Done!'));
});


gulp.task('default',['js']);