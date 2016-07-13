(function() {
    'use strict';

    var _  = require('lodash'),
        browserSync = require('browser-sync'),
        chance = require('chance'),
        changed = require('gulp-changed'),
        cached = require('gulp-cached'),
        gulp = require('gulp'),
        gulpif = require('gulp-if'),
        data = require('gulp-data'),
        filter = require('gulp-filter'),
        lazypipe = require('lazypipe'),
        reload = browserSync.reload,
        plumber = require('gulp-plumber'),
        pkg = require('../package.json'),
        prettify = require('gulp-prettify'),
        progeny = require('gulp-progeny'),
        jade = require('gulp-jade'),
        jadeInheritance = require("gulp-jade-inheritance"),
        skUtil = require('./utilities'),
        watch = require('gulp-watch');

    var chanceHelper = new chance();

    // ---------------------------------------------------------
    // Settings for scripts tasks

    var tasks = {

        compileJade: {
            watch: ['app/templates/**/*.jade', '!app/templates/*.jade'],
            input: ['app/templates/*.jade'],
            baseDir: '/app/templates/',
            output: 'dist/',
            prettify: true
        },

        compileJadeChanged: {
            enable: 'onlyWatch',
            watch: ['app/templates/**/*.jade'],
            input: ['app/templates/**/*.jade'],
            baseDir: './app/templates/',
            output: 'dist/',
            prettify: true
        }

    };

    // ---------------------------------------------------------
    // Scripts tasks (generated from enabled ones from `tasks`)

    gulp.task('templates', skUtil.tasksList(tasks));



    // ---------------------------------------------------------
    // Jade compiling partial
    var jadeCompile = lazypipe()
      .pipe(data, (function (file) {
        return {
          relativePath: file.history[0].replace(file.base, ''),
          chance: chanceHelper,
          rand: skUtil.rand,
          _: _,
          page: {
            title: pkg.name,
            description: pkg.description
          }
        };
      }))
      .pipe(jade)
      .pipe(prettify, {
        indent_size: 4,
        indent_char: ' ',
        indent_with_tabs: true,
        condense: false,
        indent_inner_html: true,
        preserve_newlines: true,
        unformatted: ['pre', 'code']
      });

    // ---------------------------------------------------------
    // TASK `compileJade`: converts jade files to html

    gulp.task('compileJade', function() {
        var task = tasks.compileJade;
        return gulp.src(task.input)
          .pipe(plumber({errorHandler: skUtil.onError}))
          .pipe(cached("jade"))
          .pipe(jadeCompile())
          .pipe(gulp.dest(task.output));
    });

    // ---------------------------------------------------------
    // TASK `compileJadeChanged`: converts only changed base jade files to html

    gulp.task('compileJadeChanged', function() {
      var task = tasks.compileJadeChanged;
      return gulp.src(task.input)
        .pipe(plumber({errorHandler: skUtil.onError}))
        //.pipe(cached("jade"))
        //.pipe(jadeInheritance({basedir: task.baseDir}))
        //.pipe(filter(function (file) {
        //  return !/\/helpers|\/layouts|\/modules|\/partials/.test(file.path);
        //}))
        .pipe(jadeCompile())
        .pipe(gulp.dest(task.output))
        .pipe(reload({ stream:true }));
    });

    // ---------------------------------------------------------
    // Watchers

    gulp.task('watchTemplates', function() {

        /*
        if ( tasks.compileJade.enable !== false ) {
            watch(tasks.compileJade.watch,function(){ gulp.start('compileJade'); });
        }
        */

        if ( tasks.compileJadeChanged.enable !== false ) {
            watch(tasks.compileJadeChanged.watch,function(){ gulp.start('compileJadeChanged'); });
        }

    });


}());
