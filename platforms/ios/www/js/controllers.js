angular.module('app.controllers', ['ngCordova','pascalprecht.translate'])

.controller('scanQRCodeCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$timeout, $stateParams,$http,$cordovaBarcodeScanner,$ionicPopup,intervenant,$window,$translate,$filter  ) {

/*
cordova.plugins.diagnostic.requestCameraRollAuthorization(function(granted){
    console.log("Authorization request for camera roll was " + (granted ? "granted" : "denied"));
}, function(error){
  alert("error");
    console.error(error);
});
alert("cool")

*/




$scope.intervenants = intervenant.intervenant;
//Keyboard.close();


var translate = $filter('translate');

$scope.scanBarcode = function($scope)
{
//alert("Merci d'accepter l'application à utiliser l'appareil photo pour scanner le qrCode !!")

try
{


let permissions = cordova.plugins.permissions;
permissions.checkPermission(permissions.CAMERA, (status) => {
 if (!status.hasPermission) {
    permissions.requestPermission(
      permissions.CAMERA,
      (status) => {
        if (!status.hasPermission) {
          errorCallback();
        } else {
          this.launchQRCodeScan();
        }
      },
      errorCallback);
  } else {
  


$cordovaBarcodeScanner.scan().then(
  function (result) {
    var tab= {code:result.text};
    $http.post( url_projet + '/rha/appsalon/hello/',tab)
    .then(function (response) {
      response = response.data;
      if (response.error)
      {
        alert(response.error);
        return false;
      }
      if (response.success)
      {

        var alertPopup = $ionicPopup.alert({
         title: translate("Succès"),
         template: translate("Visite enregistrée")
       });

        alertPopup.then(function(res) {
          $state.go("tabsController.lesExposants");
          $timeout(function() { $state.go("tabsController.exposant",{id:response.intervenant.si_id})},200);
        });
          intervenant.visite.push(response.visite)

        return false;




        return false;
      }
     // alert(response);
    });
  },
  function (error) {
    alert(translate("Erreur") + error);
  },
  {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          prompt : translate("Prenez en photo le QR Code du fournisseur"), // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS
        }
        );
  
  }
}, errorCallback);



}
catch(e)
{
  alert('Une erreur a eu lieu sur le barcode');
  alert(e);
}





}




})

.controller('lesExposantsCtrl', ['$scope', '$stateParams', 'intervenant','$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,intervenant,$filter) {
console.log($stateParams);
 $scope.intervenantId  = false;
$scope.intervenant = intervenant;
if ($stateParams.id)
{
  $scope.intervenantId = $stateParams.id;
  $scope.t_intervenant= $scope.$eval("(intervenant.intervenant | filter:{si_id: intervenantId })[0]");
console.log(  $scope.t_intervenant)
}


$scope.tabSelect = function(id,$document)
{
angular.element(document.getElementsByClassName("tabsSelect-content")).removeClass('active');
angular.element(document.getElementById(id)).addClass('active slide-left-right');
}



}])

.controller('cloudTabDefaultPageCtrl', ['$scope', '$stateParams','info_salon','$translate','$rootScope','$location','sessionService','login', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,info_salon,$translate,$rootScope,$location,sessionService,login) {

$scope.salon = info_salon;
info_salon.loadData().then(function()
{
});

$scope.setLang = function(lang)
{
    $translate.use(lang);
    login.setLang(lang);

}
$scope.logout= function()
{
  $rootScope.globals = false;
  sessionService.set("globalsUser",{});

  $location.path('/page1/connection/');

}


}])
.controller('loginCtrl',['$rootScope','$scope','$stateParams','login','$http', '$location','login','magasin','$translate',
function($rootScope,$scope,$stateParams,login,$http, $location,login,magasin,$translate)
{
$scope.account = {};
$scope.magasin = magasin;
$scope.account.lang = 'fr'

magasin.loadData().then(function()
{
});

login.loadLogin();
login.loadLang();
if ($rootScope.globals && $rootScope.globals.user)
{
$location.path('/page1/scan');
console.log($rootScope.globals);
}
$scope.setLang = function(lang)
{
    $translate.use(lang);
    login.setLang(lang);
        $scope.account.lang=lang;
}



$scope.login = function()
{
var tab= {account:$scope.account}
$http.post(url_projet + '/rha/appsalon/login/',tab).then(function(response)
{
response = response.data;
if (response.error)
{
  alert("Err" + response.error);
  return false;
}
if (response.success)
{
 login.setLogin({nom:$scope.account.nom,email:$scope.account.email,id:response.id,password:$scope.account.password,"auth":response.auth,lang:$scope.account.lang});
$location.path('/page1/scan');

}


});



}


$scope.register = function()
{


  var tab= {account:$scope.account}
  tab.account.magasin = $scope.account.magasin.id;

$http.post( url_projet + '/rha/appsalon/register/',tab)
     .then(function (response) {
      response = response.data;

      if (response.error)
      {
          return false;
      }
      if (response.success)
      {
 login.setLogin({nom:$scope.account.nom,email:$scope.account.email,id:response.id,password:$scope.account.password,"auth":response.auth});
$location.path('/page1/scan');

          return false;
      }
      });
}
}]);
