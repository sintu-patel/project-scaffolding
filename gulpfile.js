var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

var scsslint = require('gulp-scss-lint');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var w3cjs = require('gulp-w3cjs');

var gulpAssemble = require('gulp-assemble');
var push = require('assemble-push');
var extname = require('gulp-extname');
var prettify = require('gulp-prettify');

require('gulp-grunt')(gulp); // add all the gruntfile tasks to gulp

// Scripts
gulp.task('javascript', function() {
	return gulp.src('dev/javascript/*.js')
		.pipe(concat('javascript.js'))
		.pipe(gulp.dest('dev/assets/js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dev/assets/js'));
});

// Sass
gulp.task('compass', function() {
	gulp.src('dev/sass/style.scss')
		.pipe(compass({
			css: 'dev/assets/css',
			sass: 'dev/sass/'
		}))
		.pipe(gulp.dest('dev/assets/css'));
});

gulp.task('copyHtmlFolder', function() {
	gulp.src('build/dev/pages/*.html')
		.pipe(gulp.dest('dev'));
});

// Scsslint
gulp.task('scssLint', function() {
	return gulp.src('dev/**/*.scss')
		.pipe(scsslint({
			'config': 'scss-lint.yml'
		}));
});

// jshint
gulp.task('jsHint', function() {
	return gulp.src('dev/**/*.js')
		.pipe(jshint({
			'config': '.jshintrc'
		}));
});

// jshint
gulp.task('jsCs', function() {
	return gulp.src('dev/**/*.js')
		.pipe(jscs({
			'config': '.jscsrc'
		}));
});

gulp.task('w3cjs', function() {
	gulp.src('dev/*.html')
		.pipe(w3cjs());
});

gulp.task('connect', function() {
	connect.server({
		port: 9000,
		root: 'dev',
		livereload: true
	});
});

gulp.task('live', function() {
	gulp.src(['dev/*.html'])
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(['dev/**/*'], ['live', 'compass', 'javascript']);
});

gulp.task('startServer', ['connect', 'watch', 'grunt-assemble', 'copyHtmlFolder']);
