var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    util = require('gulp-util');

var tasks = {
    css: {
        sources: ['node_modules/bootstrap/scss/bootstrap.scss', 'src/**/*.{scss,sass,css}'],
        fn: function(sources){
            return gulp.src(sources)
                // .pipe(plumber())
                .pipe(sass())
                .pipe(rename('master.css'))
                .pipe(minifyCSS())
                .pipe(gulp.dest('../static'));
        }
    },
    img: {
        sources: ['src/**/*.{png,gif,jpg,svg}'],
        fn: function(sources){
            return gulp.src(sources)
                .pipe(gulp.dest('../static'));
        }
    },
    js: {
        sources: ['src/**/*.js'],
        fn: function(sources){
            return gulp.src(sources)
                .pipe(concat('master.js'))
                // .pipe(uglify())
                .pipe(gulp.dest('../static'));
        }
    }
}

// set tasks
for (var task in tasks) {
    tasks[task].gulp_fn = (function(task){
        return function() {
            return tasks[task].fn(tasks[task].sources);
        };
    }(task));
    gulp.task(task, tasks[task].gulp_fn);
}

gulp.task('watch', function() {
    for (var task in tasks) {
        util.log('Gulp watching ' + tasks[task].sources + ', task is ' + task);
        gulp.watch(tasks[task].sources, [task]);
    }
});

default_tasks = Object.keys(tasks);
default_tasks.push('watch');
gulp.task('default', default_tasks);
