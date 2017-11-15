angular.module('myDirectives', []).directive('loadingg', function () {
    return {
        restrict: 'AE',
        scope: {
          spinnerName : "loading"
        },
        link: function(scope, elem, attrs) {

        },
          templateUrl: 'js/loading.html'
    };
});
