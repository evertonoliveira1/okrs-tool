angular.module('myApp.common.common-directive', [])

    .directive('Step', function () {
        var ddo = {};
        ddo.restrict = "AE";

        ddo.scope = {
            id: '@',
            titulo: '@',
            ngDisabled: '=',
            ngModel: '=',
            ngChange: '=',
            ngClick: '@',
            href: '@',
            hidebtnsave: '@',
            permissoes: '=',
            feature: '=',
        };
        ddo.templateUrl = '../../directives/step.html';

        // ddo.link = function (scope, element, attrs) {
        //     scope.feature = attrs.feature;
        //     scope.utilService = utilService;
        //     scope.remover = async function () {
        //         await utilService.Remover(scope.feature);
        //     };
        // };
        return ddo;

    });