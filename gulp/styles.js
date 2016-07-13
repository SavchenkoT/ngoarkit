(function() {
    'use strict';

    var //mainBowerFiles  = require('main-bower-files'),
        filter = require('gulp-filter'),
        browserSync = require('browser-sync'),
        concat = require('gulp-concat'),
        csso = require('gulp-csso'),
        css = require('gulp-css'),
        gulp = require('gulp'),
        gulpif = require('gulp-if'),
        merge = require('merge-stream'),
        plumber = require('gulp-plumber'),
        rename = require('gulp-rename'),
        stylus = require('gulp-stylus'),
        koutoSwiss = require('kouto-swiss'),
        rupture = require('rupture'),
        sourcemaps = require('gulp-sourcemaps'),
        combineMediaQueries = require('gulp-combine-media-queries'),
        progeny = require('gulp-progeny'),
        skUtil = require('./utilities'),
        notify = require('gulp-notify'),
        watch = require('gulp-watch');


    // ---------------------------------------------------------
    // Settings for scripts tasks

    var tasks = {

        complieStylus: {
            watch: ['app/styles/**/*.*', 'bower_components/**/*.css'],
            input: ['app/styles/*.styl'],
            output: 'dist/css/',
            concatFilename: false,
            minimify: true,
            //bowerDir: false, // './bower_components', // can be false or path
            notify: false // can be a string or false
        },

        minimifyCSS: {
            enable: false,
            watch: ['dist/css/*.css','!dist/css/*.min.css'],
            input: ['dist/css/*.css','!dist/css/*.min.css'],
            output: 'dist/css/',
            filename: {
                suffix: '.min'
            },
            replaceSources: false // TODO
        }

    };


    // ---------------------------------------------------------
    // Scripts tasks (generated from enabled ones from `tasks`)

    gulp.task('styles', skUtil.tasksList(tasks));


    // ---------------------------------------------------------
    // TASK `complieStylus`: converts stylus files to css

    gulp.task('complieStylus', function() {
        var task = tasks.complieStylus;
        var stream = gulp.src(task.input);

        stream
            .pipe(plumber({errorHandler: skUtil.onError}))
            //.pipe(cache('style'))
            //.pipe(progeny())
            .pipe(sourcemaps.init())
            .pipe(stylus({
                'include css': true,
                use: [
                    koutoSwiss(),   // A lot of useful mixins;
                    rupture()       // Helpful media queries; https://github.com/jenius/rupture
                ],
                sourcemap: {
                    inline: true,
                    sourceRoot: '.',
                    basePath: task.output
                }
            }))
            /*
            .pipe(gulpif(task.concatFilename != false,
                concat(task.concatFilename))
            )
            */
            //.pipe(combineMediaQueries()) /* doesn't support sourcemaps */
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(task.output))
            .pipe(gulpif(task.notify != false,
                notify(task.notify)
            ))

            // TODO
            /*
            .on('end', function() {
              if ( task.minimify == true ) {
                 gulp.start('minimifyCSS');
              }
            })
            */

            .pipe(browserSync.stream({
                match: ['**/*.css', '!**/*.min.css']
            }))

            .pipe(css())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(task.output))

            ;

        return stream;
    });


    // ---------------------------------------------------------
    // TASK `minimifyCSS`: creates compressed css files

    gulp.task('minimifyCSS', function() {
        var task = tasks.minimifyCSS;
        var stream = null;

        stream = gulp.src(task.input)
            .pipe(plumber({errorHandler: skUtil.onError}))
            //.pipe(combineMediaQueries())
            .pipe(csso())
            .pipe(rename(task.filename))
            .pipe(gulp.dest(task.output));

        return stream;
    });


    // ---------------------------------------------------------
    // Watchers

    gulp.task('watchStyles', function() {

        if ( tasks.complieStylus.enable !== false ) {
            watch(tasks.complieStylus.watch,function(){ gulp.start('complieStylus'); });
        }


    });

}());
