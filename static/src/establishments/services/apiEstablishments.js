'use strict';
(function() {
    define([], function() {
        return ['$http',
            function($http) {

                this.loadEstablishments = function(filters) {
                    return $http.get('/api/establishment', {
                        params: filters || {}
                    });
                }
            }
        ];
    })
})();