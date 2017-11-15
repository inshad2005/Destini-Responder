app.module.directive('loading', function() {
    return {
        restrict: 'AE',
        scope: {
          spinnerName : "="
        },
        link: function(scope, elem, attrs) {

        },
          templateUrl: 'js/module/spinner/loading.html'
    };
});
