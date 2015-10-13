'use strict';
(function() {
    define([], function() {
        return ['$scope',
            function($scope) {
                $scope.myInterval = 5000;
                $scope.noWrapSlides = false;
                $scope.slides = [
                    {image: '/images/accommodation_1.jpg'},
                    {image: '/images/accommodation_2.jpg'}
                ];
            }
        ];
    });
})();