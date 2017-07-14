(function() {
     function StarRatingCtrl($scope, $window) {
       $scope.rating = 0;

     }

     angular
         .module('blocJams')
         .controller('StarRatingCtrl', ['$scope', '$window', StarRatingCtrl]);
 })();
