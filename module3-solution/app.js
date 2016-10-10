(function () {

  'use strict';
  angular.module('NarrowItDownApp',[]).config(function($sceDelegateProvider) {
     $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://slrbl.github.io/crsr-ng/module3-solution/**'
  ])
    
    
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)

  .directive('foundItems', foundItems);
  

    

  function foundItems() {
  var ddo = {
    templateUrl: 'founditems.html',
    scope: {
      myItems:'=',
      title: '@',
    },

    controller: NarrowItDownController,
    controllerAs: 'NarrowItDown',
    bindToController:{
      onRemove: '&'
    },
  };
  return ddo;
}



  NarrowItDownController.$inject=['$scope','MenuSearchService'];
  function NarrowItDownController($scope,MenuSearchService) {
    var NarrowItDown=this;

    NarrowItDown.found=[]




    NarrowItDown.getMatchedMenuItems=function () {
      NarrowItDown.found=MenuSearchService.getMatchedMenuItems(NarrowItDown.searched);
    }

    NarrowItDown.removeItem = function (itemIndex) {
      NarrowItDown.title=NarrowItDown.found[itemIndex].name+" was removed"
      NarrowItDown.found.splice(itemIndex, 1);


  }


  }








  MenuSearchService.$inject=['$http']
  function MenuSearchService($http) {
    var service=this;
    service.getMatchedMenuItems=function(searchTerm){
      service.filtredResult=[];
      var response = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      });
      response.then(function (response) {
        service.items=response.data;
        console.log(service.items);
        for (var i=0; i<response.data.menu_items.length; i++) {
          if (response.data.menu_items[i].description.indexOf(searchTerm) !== -1){
            service.filtredResult.push(response.data.menu_items[i]);
          }
        }
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
        service.filtredResult=[];
      });
      return service.filtredResult;
    };
  }



})();
