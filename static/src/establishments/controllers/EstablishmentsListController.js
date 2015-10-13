'use strict';
(function() {
    define([], function() {
        return ['$scope', '$document', 'apiEstablishments',
            function($scope, $document, apiEstablishments) {
                $scope.dataLoading = true;
                $scope.establishments = [];
                $scope.currentPage = 1;
                $scope.totalPages = 0;
                $scope.itemsPerPage = 5;
                $scope.totalResults = 0;

                /// Load first page
                __loadEstablishments($scope.currentPage);

                /**
                 * Closure to load next page of establishments
                 * @param page
                 * @private
                 */
                function __loadEstablishments(page) {
                    apiEstablishments.loadEstablishments({page: page}).then(
                        function(response) {
                            $scope.dataLoading = false;
                            $scope.totalResults = response.data.total;
                            $scope.totalPages = response.data.totalPages;
                            $scope.establishments = response.data.items;
                        },
                        function(response) {
                            /// TODO error handling
                            console.log(response);
                        }
                    )
                }


                $scope.pageChanged = function() {
                    __loadEstablishments($scope.currentPage);
                    var someElement = angular.element(document.getElementById('scroll-to-element'));
                    $document.scrollToElement(someElement, 30, 400);
                };
            }
        ];
    });
})();