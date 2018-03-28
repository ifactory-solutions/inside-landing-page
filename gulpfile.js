var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var del = require('del')
var requirejsOptimize = require('gulp-requirejs-optimize')

var paths = {
    scripts: 'lib/**/*.js'
}

gulp.task('clean', function () {
    return del(['dist'])
})

gulp.task('scripts', ['clean'], function () {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts'])
})

gulp.task('default', ['scripts'])