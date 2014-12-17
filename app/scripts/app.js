'use strict';

/**
 * @ngdoc overview
 * @name homepageApp
 * @description
 * # homepageApp
 *
 * Main module of the application.
 */
angular
  .module('homepageApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/space-invaders', {
        templateUrl: 'views/space-invaders.html',
        controller: 'SpaceInvadersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
