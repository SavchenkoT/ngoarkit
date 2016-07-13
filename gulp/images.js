/*
*
*   TODO: https://github.com/wakayama-io/gulpicon/
*
* */

(function() {
    'use strict';

    var es = require('event-stream'),
        gulp = require('gulp'),
        //iconfont = require('gulp-iconfont'),
        browserSync = require('browser-sync'),
        imagemin = require('gulp-imagemin'),
        jade = require('gulp-jade'),
        rename = require('gulp-rename'),
        skUtil = require('./utilities'),
        spritesmith = require('gulp.spritesmith'),
        plumber = require('gulp-plumber'),
        watch = require('gulp-watch');


    // ---------------------------------------------------------
    // Settings for image tasks

    var tasks = {

        spritesPng: {
            enable: false,
            watch: ['app/images/sprites/**/*.png', 'gulp/templates/stylus.sprites.mustache'],
            input: 'app/images/sprites/**/*.png',
            imgOutput: 'dist/css/images/',
            stylOutput: 'app/styles/helpers/'
        },

        copyMedia: {
            watch: ['app/media/**/*', '!app/media/**/*._t_'],
            input: ['app/media/**/*', '!app/media/**/*._t_'],
            output: 'dist/media/'
        },

        copyImages: {
            watch: ['app/images/**/*', '!app/images/sprites/**/*', '!app/images/iconfont/**/*', '!app/images/**/*._t_'],
            input: ['app/images/**/*', '!app/images/sprites/**/*', '!app/images/iconfont/**/*', '!app/images/**/*._t_'],
            output: 'dist/css/images/'
        },

        iconFont: {
            enable: false,
            watch: ['app/images/iconfont/**/*.svg', 'gulp/templates/iconfont.jade'],
            input: 'app/images/iconfont/**/*.svg',
            fontOutput: 'dist/css/fonts/',
            stylOutput: 'app/styles/helpers/'
        }
    };

    // ---------------------------------------------------------
    // Image tasks (generated from enabled ones from `tasks`)

    gulp.task('images', skUtil.tasksList(tasks));

    // ---------------------------------------------------------
    // TASK `spritesPng`: make png sprites from /images/sprites files

    gulp.task('spritesPng', function () {
         var spriteData = gulp.src(tasks.spritesPng.input)
            .pipe(plumber({errorHandler: skUtil.onError}))
            .pipe(spritesmith({
                imgName: 'sprites.png',
                cssName: 'sprites-png.styl',
                cssFormat: 'stylus',
                algorithm: 'binary-tree',
                cssTemplate: 'gulp/templates/stylus.sprites.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = sprite.name + '-png';
                }
            }));

         spriteData.img
            //.pipe(imagemin())
            .pipe(gulp.dest(tasks.spritesPng.imgOutput));

         spriteData.css
            .pipe(gulp.dest(tasks.spritesPng.stylOutput));

        return spriteData;
    });

    // ---------------------------------------------------------
    // TASK `copyMedia`: copy temporary media files

    gulp.task('copyMedia', function() {
        var task = tasks.copyMedia;
        return gulp.src(task.input)
            .pipe(plumber({errorHandler: skUtil.onError}))
            .pipe(skUtil.excludeEmptyFolders(es))
            .pipe(gulp.dest(task.output));
    });

    // ---------------------------------------------------------
    // TASK `copyImages`: copy & optimize interface Images

    gulp.task('copyImages',function(){
        var task = tasks.copyImages;
        return gulp.src(task.input)
            .pipe(plumber({errorHandler: skUtil.onError}))
            .pipe(skUtil.excludeEmptyFolders(es))
            //.pipe(imagemin())
            .pipe(gulp.dest(task.output))
            .pipe(browserSync.stream());
    });

    // ---------------------------------------------------------
    // TASK `iconFont`: Converting icons to webfont

    gulp.task('iconFont', function() {
        var task = tasks.iconFont;
        var fontName = 'iconfont';
        return gulp.src(task.input)
            .pipe(plumber({errorHandler: skUtil.onError}))
            .pipe(iconfont({
                fontName: fontName,
                normalize: true,
                fontHeight: 16,
                appendCodepoints: true
            }))
            .on('codepoints', function(codepoints) {
                gulp.src('gulp/templates/iconfont.jade')
                    .pipe(plumber({errorHandler: skUtil.onError}))
                    .pipe(jade({
                        locals: {
                            glyphs: codepoints,
                            fontName: fontName,
                            fontPath: 'fonts/',
                            className: 'i'
                        }
                    }))
                    .pipe(rename('iconfont.styl'))
                    .pipe(gulp.dest(task.stylOutput));
            })
            .pipe(gulp.dest(task.fontOutput));
    });


    // ---------------------------------------------------------
    // Watchers

    gulp.task('watchImages', function() {
        // TODO: to refactor

        if ( tasks.spritesPng.enable !== false ) {
            watch(tasks.spritesPng.watch,function(){ gulp.start('spritesPng'); });
        }

        if ( tasks.copyMedia.enable !== false ) {
            watch(tasks.copyMedia.watch,function(){ gulp.start('copyMedia'); });
        }

        if ( tasks.copyImages.enable !== false ) {
            watch(tasks.copyImages.watch,function(){ gulp.start('copyImages'); });
        }

        if ( tasks.iconFont.enable !== false ) {
            watch(tasks.iconFont.watch,function(){ gulp.start('iconFont'); });
        }

        /*
        for( var key in tasks){
            if( tasks[key].enable !== false && tasks[key].watch ){
                watch(tasks[key].watch, function(){
                    gulp.start(tasks[key].run ? tasks[key].run : key)
                });
            }
        }
        */
    });


})();
