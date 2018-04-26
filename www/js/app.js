// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

document.addEventListener("deviceready", yourCallbackFunction, false);

 yourCallbackFunction: function() {


            cordova.plugins.diagnostic.requestCameraAuthorization(
                function(status){

                    console.log("Authorization request for camera use was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));

                    if (myApp.device.ios) { 

                             cordova.plugins.diagnostic.isCameraRollAuthorized(function(authorized){
                              if (!authorized) {
                                   cordova.plugins.diagnostic.requestCameraRollAuthorization(function(granted){

                                   }, function(error){
                                      console.log("Authorization request for camera roll has error " + error.code + " - "+ err.msg);
                                   });

                              }
                            });
                      }

                }, function(error){
                    console.error("The following error occurred: "+error);
                }, false
            );  



var url_projet = "https://www.hexaplus.fr/";

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','ngCordova'])
.config(function($ionicConfigProvider, $sceDelegateProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})


.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('es', {
    'TITLE': 'Hello',
    'FOO': 'This is a paragraph',
    "S'inscrire":"Regístrese",
    "Email":"Correo electrónico",
    "Mot de passe":"Contraseña",
    "Nom / Prénom":"Apellido / Nombre",
    "Se reconnecter":"Reconectar",
    'INFO_QRCODE':"Escanear los QRcodes de los proveedores que visitará para registrar su visita y obtener información adicional",
    "SCAN_QRCODE":"Escanear un QrCode",
    "Scanner":"Escáner",
    "Les exposants":"Los expositores",
    "Exposants":"Expositores",
    "Fournisseur":"Proveedor",
    'INFO_EXPOSANT':"Aquí está la lista de proveedores presentes en la feria. Haga clic en uno de ellos para obtener más información. Los proveedores que ha visitado aparecerán marcados",
    'Position au salon':"Posición en la feria",
    'Envoyer un mail':'Enviar un correo electrónico',
    'Présentation':'Presentación',
    'Contacto':'Contacto',
    'Informations':'Información',
    'Infos':'Información',
    "Informations générales":'Informaciones generales',
    "INFO_PRATIQUE":"Aquí encontrará información práctica sobre la exposición.",
    "LOADING":"Cargando información.... Se requiere una conexión a Internet...",
    "Compte":"Cuenta",
    "Mon compte":"Mi Cuenta",
    "INFO_COMPTE":"Contiene información sobre su cuenta de aplicación de salón de belleza",
    "N° visiteur":"Visitante no.",
    "Se déconnecter":"Desconectar",
    "Re-connection":"Reconectar",
    'Sélectionnez votre magasin':'Seleccione su tienda',
    'Prenez en photo le QR Code du fournisseur':"Tomar una foto del Código QR dado por el proveedor",
    "Succès":"Éxito"
  });
 


  $translateProvider.translations('fr', {
    'TITLE': 'Hallo',
    'INFO_QRCODE': "Scannez les QRcode des fournisseurs que vous allez visiter pour enregistrer votre visite et obtenir des informations complémentaires",
    "SCAN_QRCODE":"Scanner un QrCode",
    "INFO_EXPOSANT":"Voici la liste des fournisseurs présents sur le salon. Cliquez sur l'un d'eux pour avoir plus d'information. Les fournisseurs que vous avez visités apparaîtront cochés",
    "INFO_PRATIQUE":"Trouvez ici les informations pratiques du salon",
    "LOADING":"Chargement des informations... Une connection Internet est requise..",
    "INFO_COMPTE":"Contient les informations sur votre compte d'application salon",
  });
 
  $translateProvider.preferredLanguage('fr');
}])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.run(['$rootScope', '$location', '$http','$state',
    function ($rootScope, $location, $http,$state) {
        // keep user logged in after page refresh


        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            console.log($location.path());

            if (($location.path() !== '/login' && $location.path() !== '/connection') && !$rootScope.globals) {
                $location.path('/login');
            }



        });
    }])

    .run(function ($ionicPlatform, $cordovaFile) {
        $ionicPlatform.ready(function () {

            ionic.Platform.isFullScreen = false;
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard or form inputs)
          /*  if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.disableScroll(true);
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            */
        })
   })
    .config(['$ionicConfigProvider', function ($ionicConfigProvider){
        $ionicConfigProvider.scrolling.jsScrolling(!ionic.Platform.isAndroid());
    }])

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])
.filter('dateToISO', function() {
  return function(input) {
    return new Date(input).toISOString();
  };
})

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });

      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});
