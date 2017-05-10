var gulp            = require("gulp"),
    sass            = require("gulp-ruby-sass"),
    autoprefixer    = require("gulp-autoprefixer"),
    rename          = require('gulp-rename'),
    minifycss       = require('gulp-minify-css'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    notify          = require('gulp-notify'),
    plumber         = require('gulp-plumber');

gulp.task('css', function() {
    return sass('src/*.scss') 
        .on('error', function (err) {
            console.error('Error!', err.message);
    })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))    
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())    
    .pipe(concat('amaran.min.css'))
    .pipe(gulp.dest('dist'))
    .pipe(notify('All CSS Works Done!'));
});

gulp.task('js',function(){
     gulp.src("src/*.js")
         .pipe(plumber())
         .pipe(gulp.dest('dist'))
         .pipe(rename({ suffix: '.min' }))
         .pipe(uglify())
         .pipe(gulp.dest('dist'))
         .pipe(notify('All JS Works Done!'));
});
// Gulp watch task
gulp.task('watch',function(){
    gulp.watch('src/*.scss',['css']);
    gulp.watch('src/*.js',['js']);
});

gulp.task('default',['css','js','watch']);