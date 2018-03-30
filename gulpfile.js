const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const image = require('gulp-image');
var rename = require("gulp-rename");
 
gulp.task('resize', function () {
  gulp.src('img_original/*')
    .pipe(imageResize({
      width : 400,
      height : 400,
      crop : false,
      upscale : false
    }))
    .pipe(image())
    .pipe(gulp.dest('img'));
});

gulp.task('optimize', function () {
  gulp.src('img_original/*')
    .pipe(image())
    .pipe(rename(function (path) {
      path.basename += '-800';
    }))
    .pipe(gulp.dest('img'));
});

gulp.task('default', ['resize', 'optimize']);