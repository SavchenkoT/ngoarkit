(function() {

    var gulp = require('gulp');
    var fs = require('fs');
    var browserify = require('browserify');
    var watchify =  require('watchify');
    var babelify = require('babelify');
    var rimraf = require('rimraf');
    var source = require('vinyl-source-stream');
    var _ = require('lodash');
    var browserSync = require('browser-sync');
    var skUtil = require('./utilities');
    var plumber = require('gulp-plumber');
    var reload = browserSync.reload;
    var transform = require('vinyl-transform');
    var vinyl = require('vinyl');
    var through2 = require('through2');
    var rename = require("gulp-rename");
    //var uglify = require('uglify');

    var config = {
        entryFile: 'app/scripts/application.js',
        outputDir: 'dist/scripts',
        outputFile: 'application.js'
    };

    // clean the output directory
    gulp.task('cleanScripts', function(cb){
        rimraf(config.outputDir, cb);
    });

    var bundler;
    function getBundler() {
        if (!bundler) {
            bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
        }
        return bundler;
    };

    function bundle() {
        return getBundler()
          .transform(babelify)
          .transform('debowerify')
          .bundle()
          //.on('error', function(err) { console.log('Error: ' + err.message); })
          .pipe(plumber({errorHandler: skUtil.onError}))
          .pipe(source(config.outputFile))
          .pipe(gulp.dest(config.outputDir))
          .pipe(reload({ stream: true }));
    }

    gulp.task('build-persistent',  function() {
        return bundle();
    });

    gulp.task('scripts', ['build-persistent']);

    gulp.task( 'scriptsAndExit', function() {
        var bundler = function() {
            var b = browserify(),
                stream = through2.obj( function( file, enc, next ) {
                    b.add( file.path );
                    next();
                }, function( next ) {
                    b.bundle( function( err, src ) {
                        stream.push( new vinyl( {
                            path: config.entryFile , // this path is relative to dest path
                            contents: src
                        } ) );
                        next();
                    } );
                } );
            b.transform(babelify);
            b.transform('debowerify');
            return stream;
        };
        return gulp.src( config.entryFile )
          .pipe( bundler() )
          //.pipe(source(config.outputFile))
          .pipe(rename({
              dirname: '',
          }))
          .pipe( gulp.dest( config.outputDir  ) );
    } );

    /*
    gulp.task('buildAndExit',['cleanScripts'], function() {
        var browserified = transform(function(filename) {
            var b = browserify(filename);
            // pre-bundle actions here
            // for eg: transform()
            b.transform(babelify);
            b.transform('debowerify');
            return b.bundle();
        });

        return gulp.src(config.entryFile)
          .pipe(browserified)
          //.pipe(source(config.outputFile))
          .pipe(gulp.dest(config.outputDir))
    });
    */

    gulp.task('watchScripts', ['build-persistent'], function() {
        getBundler().on('update', function() {
            gulp.start('build-persistent')
        });
    });

}());
