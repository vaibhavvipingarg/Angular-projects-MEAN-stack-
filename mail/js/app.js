angular.module('EmailApp', [
    'ngRoute'
])
.config(function($routeProvider){
    'use strict';
        $routeProvider
            .when('/inbox', {
               templateUrl: 'views/inbox.html',
               controller: 'InboxCtrl',
               controllerAs: 'inbox'
            })
            .otherwise({
                redirectTo: '/inbox'
            });
});