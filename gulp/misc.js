(function() {
    'use strict';

    var _ = require('lodash'),
        chance = require('chance'),
        data = require('gulp-data'),
        gulp = require('gulp'),
        gulpif = require('gulp-if'),
        gulpFilter = require('gulp-filter'),
        gutil = require('gulp-util'),
        es = require('event-stream'),
        foreach = require('gulp-foreach'),
        skUtil = require('./utilities'),
        jsonlint = require("gulp-jsonlint"),
        pkg = require('../package.json'),
        plumber = require('gulp-plumber'),
        rename = require('gulp-rename'),
        jade = require('gulp-jade'),
        watch = require("gulp-watch"),
        zip = require('gulp-zip');

    var chanceHelper = new chance();

    // ---------------------------------------------------------
    // Settings for scripts tasks

    var tasks = {

        api: {
            watch: ['app/misc/api/**/*', '!app/misc/api/**/*.source'],
            input: ['app/misc/api/**/*', '!app/misc/api/**/*.source'],
            output: 'dist/api/',
            jsonlint: true
        },

        copyFavicons: {
            watch: ['app/misc/favicons/**/*'],
            input: ['app/misc/favicons/**/*'],
            output: 'dist/'
        },

        copyFonts: {
            watch: ['app/misc/fonts/**/*'],
            input: ['app/misc/fonts/**/*'],
            output: 'dist/css/fonts/'
        },

        copyHTML: {
            watch: ['app/misc/html/**/*'],
            input: ['app/misc/html/**/*'],
            output: 'dist/'
        },

        copyHTC: {
            watch: ['app/misc/htc/**/*'],
            input: ['app/misc/htc/**/*'],
            output: 'dist/css/'
        },

        zipDest: {
            enable: false,
            interval: 2 * 1000 * 60 * 0, /* two minutes */
            input: ['dist/**/*','!dist/*.zip'],
            output: 'dist/',
            filename: pkg.name + '.zip'
        }

    };

    // ---------------------------------------------------------
    // Scripts tasks (generated from enabled ones from `tasks`)

    gulp.task('misc', skUtil.tasksList(tasks));


    // ---------------------------------------------------------
    // TASK `api`: Copy json files  and check them
    // Also complite jade files to json or js files

    gulp.task('api', function(){

        var task = tasks.api;
        var jadeFilter = gulpFilter('**/*.jade', {restore: true});
        var jsonFilter = gulpFilter('**/*.json', {restore: true});

        return gulp.src(task.input)
            .pipe(plumber({errorHandler: skUtil.onError}))
            .pipe(skUtil.excludeEmptyFolders(es))

            // filter jade files
            .pipe(jadeFilter)
            .pipe(data(function(file) {
              return {
                  chance: chanceHelper,
                  rand: skUtil.rand,
                  _: _
              };
            }))
            .pipe(jade())
            .pipe(rename({
                extname: ""
            }))
            .pipe(jadeFilter.restore)

            // checking json
            .pipe(jsonFilter)
            .pipe(gulpif(task.jsonlint,
                jsonlint(),
                jsonlint.reporter()
            ))
            .pipe(jsonFilter.restore)

            .pipe(gulp.dest(task.output));
    });

    // ---------------------------------------------------------
    // TASK `copyFavicons`: Copy favicons

    gulp.task('copyFavicons', function(){
        var task = tasks.copyFavicons;
        return gulp.src(task.input)
            .pipe(plumber({errorHandler: skUtil.onError}))
            .pipe(skUtil.excludeEmptyFolders(es))
            .pipe(gulp.dest(task.output));
    });

    // ---------------------------------------------------------
    // TASK `copyFonts`: Copy webfonts

    gulp.task('copyFonts', function(){
        var task = tasks.copyFonts;
        return gulp.src(task.input)
            .pipe(plumber({errorHandler: skUtil.onError}))
            .pipe(skUtil.excludeEmptyFolders(es))
            .pipe(gulp.dest(task.output));
    });

    // ---------------------------------------------------------
    // TASK `copyHTML`: Copy HTML files

    gulp.task('copyHTML', function(){
        var task = tasks.copyHTML;
        return gulp.src(task.input)
          .pipe(plumber({errorHandler: skUtil.onError}))
          .pipe(skUtil.excludeEmptyFolders(es))
          .pipe(gulp.dest(task.output));
    });

    // ---------------------------------------------------------
    // TASK `copyHTC`: Copy HTC files

    gulp.task('copyHTC', function(){
        var task = tasks.copyHTC;
        return gulp.src(task.input)
          .pipe(plumber({errorHandler: skUtil.onError}))
          .pipe(skUtil.excludeEmptyFolders(es))
          .pipe(gulp.dest(task.output));
    });

    // ---------------------------------------------------------
    // TASK `zipDest`: Zip All the compiled files

    gulp.task('zipDest', function(){
        var task = tasks.zipDest;
        return gulp.src(task.input)
          .pipe(zip(task.filename))
          .pipe(gulp.dest(task.output))
          .on('end', function() {
              gutil.log('Dist is zipped to', gutil.colors.blue(task.filename))
          });
    });



    // ---------------------------------------------------------
    // Watchers

    gulp.task('watchMisc', function() {

        if ( tasks.api.enable !== false ) {
            watch(tasks.api.watch,function(){ gulp.start('api'); });
        }

        if ( tasks.copyFavicons.enable !== false ) {
            watch(tasks.copyFavicons.watch,function(){ gulp.start('copyFavicons'); });
        }

        if ( tasks.copyFonts.enable !== false ) {
            watch(tasks.copyFonts.watch,function(){ gulp.start('copyFonts'); });
        }

        if ( tasks.copyHTML.enable !== false ) {
            watch(tasks.copyHTML.watch,function(){ gulp.start('copyHTML'); });
        }

        if ( tasks.copyHTC.enable !== false ) {
            watch(tasks.copyHTC.watch, function(){ gulp.start('copyHTC'); });
        }

        if ( tasks.zipDest.interval > 0 ) {
            setInterval(function(){
                gulp.start('zipDest');
            }, tasks.zipDest.interval);
        }

    });


}());
