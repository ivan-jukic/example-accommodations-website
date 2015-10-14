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
                $scope.priceSlider = {
                    min: 50,
                    max: 4500,
                    ceil: 5000,
                    floor: 0
                };
                $scope.ratingSlider = {
                    min: 1,
                    max: 10,
                    ceil: 10,
                    floor: 1
                };
                $scope.filterStars = null;
                $scope.filterName = null;
                $scope.sortBy = null;
                $scope.sortDirection = null;


                /// Load first page
                __loadEstablishments($scope.currentPage);

                /**
                 * Closure to load next page of establishments
                 * @private
                 */
                function __loadEstablishments() {
                    apiEstablishments.loadEstablishments(getFiltersAndSort()).then(
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


                $scope.onFiltersOrSortUpdate = function() {
                    $scope.currentPage = 1;
                    __loadEstablishments();
                };


                $scope.pageChanged = function() {
                    __loadEstablishments($scope.currentPage);
                    var someElement = angular.element(document.getElementById('scroll-to-element'));
                    $document.scrollToElement(someElement, 30, 400);
                };


                $scope.sortOnAttribute = function(attribute) {
                    $scope.currentPage = 1;
                };


                $scope.sortOnDirection = function(direction, $event) {
                    $event.preventDefault();
                    if ($scope.sortBy) {
                        $scope.sortDirection = direction;
                        $scope.currentPage = 1;
                        __loadEstablishments();
                    }
                };


                function getFiltersAndSort() {
                    var filters = {};

                    if ($scope.currentPage > 1) {
                        filters.page = $scope.currentPage;
                    }

                    if ($scope.sortBy) {
                        filters.sortBy = $scope.sortBy;
                        filters.sortDirection = $scope.sortDirection = $scope.sortDirection || 'asc';
                    } else {
                        $scope.sortDirection = null;
                    }

                    return filters;
                }


                /*******************************************************************************************************
                 * Variables necessary for carousel
                 * @type {number}
                 */
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