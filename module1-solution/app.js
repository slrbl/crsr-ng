(function () {
  'use strict';
  angular.module('LunchCheck',[])

  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject=['$scope']

  function LunchCheckController($scope){
    $scope.countLunchElements=function () {
      if ($scope.lunchContent==null || $scope.lunchContent==""){
        $scope.messageColor="red";
        $scope.message="Please enter data first";
      }
      else{
        $scope.messageColor="green";
        if ($scope.lunchContent.split(',').length>3)
          $scope.message="Too Much!";
        else
          $scope.message="Enjoy!";
      }
    }
  };
})();
