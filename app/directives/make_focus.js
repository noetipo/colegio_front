/**
 * Created by raul on 05/07/17.
 */
"use strict";
app.
    directive('makeFocus', ['$timeout', function($timeout) {
    return {
        restrict: 'A',

        link : function($scope, $element) {
            $timeout(function() {
                $element[0].focus();
            });
        }
    }
}]);
