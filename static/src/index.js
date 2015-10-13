'use strict';
(function() {
    define([
        'require',
        'angular'
    ], function() {
        require([window.appName], function(appName) {
            angular.bootstrap(document, [appName]);
        });
    });
})();