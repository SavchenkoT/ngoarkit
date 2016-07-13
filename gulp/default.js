(function() {
    'use strict';

    require('./images');
    require('./scripts');
    require('./styles');
    require('./templates');
    require('./misc');
		//require('./wrapper');

    var gulp = require('gulp'),
        del = require('del'),
        browserSync = require('browser-sync'),
        runSequence = require('run-sequence'),
        pkg = require('../package.json');

    var projectCode = pkg.name.toLowerCase().split("_").join("-");

    // ---------------------------------------------------------
    // Clean `dist`

    gulp.task('clean', function(cb) {
        return del(['dist'], cb);
    });


    // ---------------------------------------------------------
    // Running server on free port

    gulp.task('serve', function() {
        browserSync({
            port: 1339,
            ui: {
              port: 1340
            },
            server: {
                baseDir: 'dist',
                directory: true
            }
        });
    });


    // ---------------------------------------------------------
    // Build app

    gulp.task('build', ['clean'], function (cb) {
        runSequence([
                'images',
                'scripts',
                'styles',
                'templates',
                'misc',
								//'wrapper'
            ],
            ['serve'],
            cb);
    });

    gulp.task('buildAndExit', ['clean'], function (cb) {
        runSequence([
                'images',
                'scriptsAndExit',
                'styles',
                'templates',
                'misc'
            ],
            cb);
    });

    gulp.task('dist', ['pack']);


    // ---------------------------------------------------------
    // Watch app

    gulp.task('watch', [
        'watchImages',
        'watchScripts',
        'watchStyles',
        'watchTemplates',
        'watchMisc',
				//'watchWrapper'
    ]);


    // ---------------------------------------------------------
    // Run default task

    gulp.task('default', ['build', 'watch']);


}());
