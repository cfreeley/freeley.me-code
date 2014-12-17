'use strict';

describe('Service: pixelGenerator', function () {

  // load the service's module
  beforeEach(module('homepageApp'));

  // instantiate service
  var pixelGenerator;
  beforeEach(inject(function (_pixelGenerator_) {
    pixelGenerator = _pixelGenerator_;
  }));

  it('should do something', function () {
    expect(!!pixelGenerator).toBe(true);
  });

});
