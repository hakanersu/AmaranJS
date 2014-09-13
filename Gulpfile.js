var gulp            = require("gulp"),
    sass            = require("gulp-ruby-sass"),
    autoprefixer    = require("gulp-autoprefixer"),
    rename          = require('gulp-rename'),
    minifycss       = require('gulp-minify-css'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    coffee          = require('gulp-coffee');

// Gulp sass task
gulp.task('css',function(){
    gulp.src("src/sass/**/*.sass")
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        //.pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(concat('amaran.min.css'))
        .pipe(gulp.dest('dist/css'));
});



// Gulp coffee task
gulp.task('js',function(){
     gulp.src("src/coffee/**/*.coffee")
         .pipe(coffee())
         .pipe(uglify())
         .pipe(concat('jquery.amaran.min.js'))
         .pipe(gulp.dest('dist/js'));
});

// Gulp watch task
gulp.task('watch',function(){
    gulp.watch('src/sass/**/*.sass',['css']);
    gulp.watch('src/coffee/**/*.coffee',['js']);
});

gulp.task('default',['watch']);