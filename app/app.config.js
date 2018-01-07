'use strict';

angular.
  module('phonecatApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/faces', {
          template: '<phone-list></phone-list>'
        }).
        when('/faces/:faceId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/faces');
    }
  ]);
