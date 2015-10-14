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
                $scope.rangePrices = {
                    min: 0,
                    max: 5000
                };
                $scope.filters = {
                    stars: null,
                    rating: null,
                    minCost: null,
                    maxCost: null,
                    name: null
                };
                $scope.ratingValues = getOptionsRange(1, 10);
                $scope.sortBy = {};
                $scope.sortingValues = [
                    {value: 'distance_asc', text: 'Nearest first'},
                    {value: 'distance_desc', text: 'Farthest first'},
                    {value: 'minCost_asc', text: 'Cheaper first'},
                    {value: 'stars_asc', text: 'Expensive first'},
                    {value: 'stars_desc', text: 'Expensive first'},
                    {value: 'rating_asc', text: 'Lowest rating first'},
                    {value: 'rating_desc', text: 'Best rating first'}
                ];


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


                /**
                 * Creates list of numbers for select element
                 * @param start
                 * @param end
                 * @returns {Array}
                 */
                function getOptionsRange(start, end) {
                    var result = [];
                    for (var i = start; i <= end; i++) {
                        result.push({value: i, text: i});
                    }
                    return result;
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