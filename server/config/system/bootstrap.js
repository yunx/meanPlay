'use strict';

var express = require('express'),
    appPath = process.cwd();

var mean = require('meanio');
mean.app('Mean Demo App', {});

module.exports = function(db) {

    function bootstrapModels() {
        // Bootstrap models
        require('meanio/lib/util').walk(appPath + '/server', 'model', null, function(path) {
            require(path);
        });
    }

    bootstrapModels();

    function bootstrapDependencies() {

        // Register database dependency
        mean.register('database', {
            connection: db
        });

        // Register app dependency
        mean.register('app', function() {
            return app;
        });
    }

    bootstrapDependencies();

    // Express settings
    var app = express();
    require(appPath + '/server/config/express')(app, db);

    return app;
};
