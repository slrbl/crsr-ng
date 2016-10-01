
  (function () {
    'use strict';
    angular.module('ShoppingListCheckOff',[])

  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService)

  ToBuyController.$inject=['$scope','ShoppingListCheckOffService'];
  function ToBuyController($scope,ShoppingListCheckOffService) {
    var toBuy=this;

    ShoppingListCheckOffService.addToBuyList('Orange',10)
    ShoppingListCheckOffService.addToBuyList('Apple',6)
    ShoppingListCheckOffService.addToBuyList('Cookie',2)
    ShoppingListCheckOffService.addToBuyList('Banana',5)
    ShoppingListCheckOffService.addToBuyList('Water',4)

    toBuy.items=ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem=function (itemName) {
      ShoppingListCheckOffService.buyItem(itemName)
    }

    toBuy.getList=function () {
      return toBuy.items;
    }
  }

  AlreadyBoughtController.$inject=['$scope','ShoppingListCheckOffService'];
  function AlreadyBoughtController($scope,ShoppingListCheckOffService) {
    var bought=this;
    bought.items=ShoppingListCheckOffService.getBoughtItems();
    bought.getList=function () {
      return bought.items;
    }
  }

  function ShoppingListCheckOffService() {
    var service=this;
    var boughtItems=[];
    var toBuyItems=[];

    service.addToBuyList=function functionName(itemName,quantity) {
      var item={
        name:itemName,
        quantity:quantity,
      };
      toBuyItems.push(item)
    }

    service.buyItem=function (itemName) {
      for (var i=0; i<toBuyItems.length; i++) {
        if (toBuyItems[i].name==itemName){
          boughtItems.push(toBuyItems[i])
          toBuyItems.splice(i,1)
        }
      }
    }
    service.getBoughtItems=function () {
      return boughtItems;
    }

    service.getToBuyItems=function () {
      return toBuyItems;
    }
  }
})();
