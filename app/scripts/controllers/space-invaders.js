'use strict';

/**
 * @ngdoc function
 * @name homepageApp.controller:SpaceInvadersCtrl
 * @description
 * # SpaceInvadersCtrl
 * Controller of the homepageApp
 */
angular.module('homepageApp')
  .controller('SpaceInvadersCtrl', function ($scope, pixelGenerator) {
    enchant();
  	var canvasWidth = 480;
  	var canvasHeight = 400;
  	var moveSpeed = 10;
  	var game = new Core(canvasWidth, canvasHeight);
  	var score = 0;
  	game.preload('images/yeoman.png');
  	game.keybind(32, 'a'); // Making 'a' be space

  	var Player = Class.create(Sprite, {
	    initialize: function() {
	    	Sprite.call(this,48,48);
            var surface = new Surface(48,48);
            var sprite = pixelGenerator.generateShipScaled(4);
            surface.context.drawImage(sprite,0,0);
	    	this.image = surface; //game.assets['images/yeoman.png'];
	    	this.x = (canvasWidth - 48) / 2;
	    	this.y = canvasHeight - 48 - 10;
	    	this.reload = 0;
	    },

	    onenterframe: function() {    
	    	if(game.input.left && !game.input.right && this.x > 10){
    			this.x -= moveSpeed;
			}
			else if(game.input.right && !game.input.left && this.x < canvasWidth - 58){
			    this.x += moveSpeed;
			}

			if (game.input.a && this.reload == 0) {
				var b = new Bullet();
				game.rootScene.addChild(b);
				b.x = this.x + 24 - 12;
				b.y = this.y;
				this.reload = 10;
			}
			else if (this.reload > 0) this.reload--;

	    }
	});

	var Alien = Class.create(Sprite, {
		//this.speed = 5;
	    initialize: function() {
	    	Sprite.call(this,48,48);
	    	this.rotate(180);
	    	var surface = new Surface(48,48);
            var sprite = pixelGenerator.generateAlienScaled(4);
            surface.context.drawImage(sprite,0,0);
            this.image = surface;
	    },

	    onenterframe: function() {    
	    	this.y += 5;
	    }
	});

	var Bullet = Class.create(Sprite, {
		initialize: function() {
			Sprite.call(this,24,24);
            var surface = new Surface(24,24);
            var sprite = pixelGenerator.generateBulletScaled(2);
            surface.context.drawImage(sprite,0,0);
	    	this.image = surface;
	    	// this.image.width = 26; this.image.height = 22;
	    	// this.scale(1.25, 1.25);
		},
		onenterframe: function() {
			this.y -= 15;
			if (this.y <= -89)
				game.rootScene.removeChild(this);
			var self = this; // inside the foreach, 'this' becomes undefined. Anyone know why?
			aliens.forEach(function(alien){	
				if (self.intersect(alien)) {
					game.rootScene.removeChild(alien);
					aliens.splice(aliens.indexOf(alien), 1); // Removes alien from array
					game.rootScene.removeChild(self);
					score++;
				}
			});
		}
	});

	var hero;
	var aliens = [];
	var scoreLabel = new Label("Score: 0");
	scoreLabel.font = "32px cursive";
    scoreLabel.color = "white";
    scoreLabel.x = 10;
    scoreLabel.y = 5;
	// var bullets = [];
  	game.onload = function () {
  		hero = new Player();
  		game.rootScene.addChild(hero);
  		game.rootScene.addChild(scoreLabel);
  		//addAliens();
  		game.rootScene.backgroundColor = 'rgb(20, 20, 50)';
        //sprite.draw(game.assets['images/yeoman.png']);
  	};
  	game.onenterframe = function () {
  		if (Math.random() > .98) {
  			var alien = new Alien();
  			aliens.push(alien);
  			game.rootScene.addChild(alien);
  			alien.x = Math.random() * (canvasWidth - 103);
  		}
  		scoreLabel.text = "Score: " + score;
  	};
  	game.start();

  });
