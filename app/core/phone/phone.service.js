'use strict';

angular.
  module('core.phone').
  factory('Phone', ['$resource',
    function($resource) {
      return $resource('faces/:faceId.json', {}, {
        query: {
          method: 'GET',
          params: {faceId: 'faces'},
          isArray: true
        }
      });
    }
  ]);
