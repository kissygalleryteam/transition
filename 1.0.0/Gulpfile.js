var gulp = require('gulp');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var prefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('css', function () {
    return gulp.src('./src/stylus/transition.styl')
        .pipe(stylus())
        .pipe(prefixer())
        .pipe(gulp.dest('./build'))
        .pipe(rename({suffix: '-min'}))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('./build'));
});

gulp.task('js', function() {
    return gulp.src('./index.js')
        .pipe(gulp.dest('./build'))
        .pipe(rename({suffix: '-min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['css', 'js']);