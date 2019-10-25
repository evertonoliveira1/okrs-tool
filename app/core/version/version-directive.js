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
              var format, dateObj;
              format = 'dd/mm/yyyy'; //(!attrs.dpFormat) ? 'dd/mm/yyyy' : attrs.dpFormat;
              //if (!attrs.initDate && !attrs.dpFormat) {
                 dateObj = new Date();
                 scope[attrs.ngModel] = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
            //   } else if (!attrs.initDate) {
            //      scope[attrs.ngModel] = attrs.initDate;
            //   } else {
            //   }

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
      prop: '@',
      ngModel: '=',
      ngChange: '@',
      onAdd: '&' 
   };

   ddo.templateUrl = 'core/version/step-for.html';

   ddo.link = function (scope, elem, attrs) {
      if(typeof scope.onAdd === 'function'){
         scope.onAdd(scope, elem, attrs);
         scope.change = async (model) => {
            if(model.hasFinished){
               if(!model.date){
                  const date = new Date();
                  model.date =  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
               }
            }
         }
      }
   };

   return ddo;

});
;

