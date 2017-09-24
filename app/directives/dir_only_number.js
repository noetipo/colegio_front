/**
 * Created by raul on 19/05/17.
 */
"use strict";
app
.directive('dirOnlyNumber', function () {
    function link(scope, element, attrs) {
        element.bind("keypress", function (event) {
            var reg = /[^0-9]/g;
            if (reg.test(event.key)) {
                event.preventDefault();
            }
        });
    }
    return {
        restrict: 'A',
        link: link
    };
});