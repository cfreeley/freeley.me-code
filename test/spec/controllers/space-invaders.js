'use strict';

describe('Controller: SpaceInvadersCtrl', function () {

  // load the controller's module
  beforeEach(module('homepageApp'));

  var SpaceInvadersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpaceInvadersCtrl = $controller('SpaceInvadersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
