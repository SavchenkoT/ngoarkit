'use strict';

var _ = require('lodash'),
    notifier = require('node-notifier'),
    gutil  = require('gulp-util');

// ---------------------------------------------------------
// Prettify error messages

module.exports.onError = function (error) {
    var errorText =  error.name + ' in ' + error.plugin;
    var errMsg = [
        '',
        '----------ERROR MESSAGE START----------------',
        ('[' + errorText + ']'),
        ('[filename: ' + error.fileName + ']'),
        error.message,
        '----------ERROR MESSAGE END------------------',
        ''
    ].join('\n');
    gutil.beep();
    gutil.log(gutil.colors.red(errMsg));
    notifier.notify({
        title: errorText,
        message: error.message,
        sound: true,
        //icon: '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/AlertStopIcon.icns',
        time: 2000
    });
    this.emit('end');
};


// ---------------------------------------------------------
// Prevent gulp to copy empty folders

module.exports.excludeEmptyFolders = function (es) {
    return es.map(function(file, cb) {
        if (file.stat.isFile()) {
            return cb(null, file);
        } else {
            return cb();
        }
    });
};

// ---------------------------------------------------------
// Getting a list of enabled tasks

module.exports.tasksList = function (tasks) {
    var tasksList = [];
    _.forIn(tasks, function(value, key) {
        if (value.enable !== false && value.enable !== 'onlyWatch' ){
            tasksList.push(key);
        }
    });
    return tasksList;
};


// ---------------------------------------------------------
// Return random array element or subarray

module.exports.rand = function(arr, min, max) {
    var len = arr.length;
    var max = max || min || null;
    if(typeof min !== 'undefined' && min >= 1){
        return _.take(_.shuffle(arr), _.random(min,max));
    }else{
        return arr[_.random(0,len-1)];
    }
};



// ---------------------------------------------------------
// Get dir name of file

module.exports.getFileDir = function(file) {
    console.log('file', file);
};
