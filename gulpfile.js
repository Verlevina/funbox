"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require('del');
var ghPages = require('gulp-gh-pages');

gulp.task("css", function () {
  return gulp.src("source/scss/main.scss")
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe((csso()))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("normalize", function () {
    return gulp.src("node_modules/normalize-scss/sass/**/*.scss")
        .pipe(gulp.dest("source/scss"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"))
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/scss/**/*.scss", gulp.series("css"));
  gulp.watch("source/*.html").on("change", gulp.series("html", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("copy","refresh"));
});
gulp.task("refresh", function () {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/*",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
});

gulp.task("clear", function () {
  return del("build");
});

gulp.task("build", gulp.series("clear","copy","css", "html"));

gulp.task("start", gulp.series("build", "server"));

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
