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
                    min: 0,
                    max: 7000,
                    floor: 0,
                    ceil: 7000
                };
                $scope.ratingSlider = {
                    min: 1,
                    max: 10,
                    floor: 1,
                    ceil: 10
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
                            if (1 == $scope.currentPage) {
                                $scope.establishments = response.data.items;
                            } else {
                                for (var i in response.data.items) {
                                    $scope.establishments.push(response.data.items[i]);
                                }
                            }
                        },
                        function(response) {
                            /// TODO error handling
                            console.log(response);
                        }
                    )
                }


                $scope.loadNextPage = function() {
                    $scope.currentPage++;
                    __loadEstablishments();
                };


                $scope.onFiltersOrSortUpdate = function() {
                    $scope.currentPage = 1;
                    __loadEstablishments();
                };


                $scope.onNameSearch = function() {
                    resetFilters(true);
                    $scope.onFiltersOrSortUpdate();
                };


                $scope.pageChanged = function() {
                    __loadEstablishments($scope.currentPage);
                    var someElement = angular.element(document.getElementById('scroll-to-element'));
                    $document.scrollToElement(someElement, 30, 400);
                };


                $scope.onResetFilters = function($event) {
                    $event.preventDefault();
                    resetFilters();
                    $scope.onFiltersOrSortUpdate();
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

                    if ($scope.priceSlider.min != $scope.priceSlider.floor || $scope.priceSlider.max != $scope.priceSlider.ceil) {
                        filters.priceRange= $scope.priceSlider.min + ',' + $scope.priceSlider.max;
                    }

                    if ($scope.ratingSlider.min != $scope.ratingSlider.floor || $scope.ratingSlider.max != $scope.ratingSlider.ceil) {
                        filters.ratingRange= $scope.ratingSlider.min + ',' + $scope.ratingSlider.max;
                    }

                    if($scope.filterStars) {
                        filters.stars = $scope.filterStars;
                    }

                    if($scope.filterName) {
                        filters.name = $scope.filterName;
                    }

                    return filters;
                }


                function resetFilters(skipNameFilter) {
                    $scope.priceSlider.min = $scope.priceSlider.floor;
                    $scope.priceSlider.max = $scope.priceSlider.ceil;

                    $scope.ratingSlider.min = $scope.ratingSlider.floor;
                    $scope.ratingSlider.max = $scope.ratingSlider.ceil;

                    $scope.filterStars = null;

                    if (!skipNameFilter) {
                        $scope.filterName = null;
                    }
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