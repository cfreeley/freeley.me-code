'use strict';

/**
 * @ngdoc function
 * @name homepageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the homepageApp
 */
angular.module('homepageApp')
  .controller('MainCtrl', function ($scope, $location) {

    $location.path("space-invaders");

  });
