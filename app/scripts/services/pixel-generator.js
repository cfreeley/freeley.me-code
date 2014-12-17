'use strict';

/**
 * @ngdoc service
 * @name homepageApp.pixelGenerator
 * @description
 * # pixelGenerator
 * Service in the homepageApp.
 */
angular.module('homepageApp')
  .service('pixelGenerator', function () {
    var spaceship = new psg.Mask([
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 1, 1,
                    0, 0, 0, 0, 1,-1,
                    0, 0, 0, 1, 1,-1,
                    0, 0, 0, 1, 1,-1,
                    0, 0, 1, 1, 1,-1,
                    0, 1, 1, 1, 2, 2,
                    0, 1, 1, 1, 2, 2,
                    0, 1, 1, 1, 2, 2,
                    0, 1, 1, 1, 1,-1,
                    0, 0, 0, 1, 1, 1,
                    0, 0, 0, 0, 0, 0
            ], 6, 12, true, false);

    var bullet = new psg.Mask([
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 1,-1,
                    0, 0, 0, 1,-1, 1,
                    0, 0, 1,-1, 1, 1,
                    0, 1,-1, 1, 1, 1,
                    0,-1, 1, 1, 1, 1
            ], 6, 6, true, true); 

    var alien = new psg.Mask([
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 1, 1,
                    0, 0, 1, 1, 1,-1,
                    0, 0, 1, 1, 1,-1,
                    0, 0, 1, 2, 2,-1,
                    0, 1,-1, 2, 2,-1,
                    0, 1,-1, 1, 1,-1,
                    0, 1,-1, 1, 2, 2,
                    0, 1,-1, 1, 2, 2,
                    0, 1, 1, 1, 1,-1,
                    0, 0, 1, 1, 1, 1,
                    0, 0, 0, 0, 0, 0
            ], 6, 12, true, false);

    this.generateShip = function() {
        return new psg.Sprite(spaceship, {
                    colored         : true
                });
    };

    this.generateShipScaled = function (scale) {
        return this.resize(this.generateShip().canvas, scale)
    };

    this.generateBullet = function() {
        return new psg.Sprite(bullet, {
                    colored         : true
                });
    };

    this.generateBulletScaled = function (scale) {
        return this.resize(this.generateBullet().canvas, scale)
    };

    this.generateAlien = function() {
        return new psg.Sprite(alien, {
                    colored         : true
                });
    };

    this.generateAlienScaled = function (scale) {
        return this.resize(this.generateAlien().canvas, scale)
    };

    this.resize = function( img, scale ) {
        var widthScaled  = img.width * scale;
        var heightScaled = img.height * scale;
        
        var orig    = document.createElement('canvas');
        orig.width  = img.width;
        orig.height = img.height;

        var origCtx = orig.getContext('2d');

        origCtx.drawImage(img, 0, 0);

        var origPixels   = origCtx.getImageData(0, 0, img.width, img.height);
        var scaled       = document.createElement('canvas');
        scaled.width     = widthScaled;
        scaled.height    = heightScaled;
        var scaledCtx    = scaled.getContext('2d');
        var scaledPixels = scaledCtx.getImageData( 0, 0, widthScaled, heightScaled );
        
        for( var y = 0; y < heightScaled; y++ ) {
            for( var x = 0; x < widthScaled; x++ ) {
                var index = (Math.floor(y / scale) * img.width + Math.floor(x / scale)) * 4;
                var indexScaled = (y * widthScaled + x) * 4;

                scaledPixels.data[ indexScaled ]   = origPixels.data[ index ];
                scaledPixels.data[ indexScaled+1 ] = origPixels.data[ index+1 ];
                scaledPixels.data[ indexScaled+2 ] = origPixels.data[ index+2 ];
                scaledPixels.data[ indexScaled+3 ] = origPixels.data[ index+3 ];
            }
        }

        scaledCtx.putImageData( scaledPixels, 0, 0 );

        return scaled;
    }
  });
