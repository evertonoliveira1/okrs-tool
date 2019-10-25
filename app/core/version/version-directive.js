'use strict';

angular.module('myApp.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}])

.directive('datepicker', function() {
  return {
     restrict: 'A',
     require: 'ngModel',
     compile: function() {
        return {
           pre: function(scope, element, attrs, ngModelCtrl) {
               const format = 'dd/mm/yyyy';
               const dateObj = new Date();
               scope[attrs.ngModel] = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();

              $(element).datepicker({
                 format: format,
              }).on('changeDate', function(ev) {
                  scope.$apply(function () {
                    ngModelCtrl.$setViewValue(ev.format(format));
                 });
              });
           }
        }
      }
   }
})

.directive('stepFor', function () {
   var ddo = {};
   ddo.restrict = "AE";

   ddo.scope = {
      title: '@',
      ngModel: '='
   };

   ddo.templateUrl = 'core/version/step-for.html';

   ddo.link = function (scope) {
      scope.change = async (model) => {
         if(model.hasFinished){
            if(!model.date){
               const date = new Date();
               model.date =  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }
         }
      }
   };

   return ddo;

});
;

