Game.Level1 = function(game){

    this.map = null ;
    this.layer = null;

    this.player = null ;
    this.controls  = {} ;
    this.playerSpeed = 150 ;

    this.enemies = null ;
    this.enemies2 = null;
    this.enemies3 = null;
    this.enemies4 = null;

    this.bullets = null ;
    this.bulletTime = 0 ;
    this.fireButton = null ;


    this.score = 0 ;
    this.scoreText = null ;
    this.winText = null;


    this.factory = new GamePartsFactory(this);
    this.compositeController = new CompositeController(this);

};




Game.Level1.prototype = {
	preload : function(){
		//Load Enemy
		this.load.image('enemy','../assets/enemy.jpg');
		this.load.image('bullet','../assets/Bullet.jpg');
	},


	create : function(){
		
		this.add.tileSprite(0, 0, 640, 640, 'background');

		// The enemy's bullets
	    this.bullets = this.factory.create("bullets");
	    this.enemies = this.factory.create("enemies");
	    this.enemies2 = this.factory.create("enemies");
	    this.enemies3 = this.factory.create("enemies");

	    this.enemies4 = this.factory.create("enemies");


	    this.createEnemies();

		//this.physics.arcade.gravity.y = 1400 ; 

		this.map = this.add.tilemap('map');
		

		this.map.addTilesetImage('tileset');
		

		this.layer = this.map.createLayer(0) ;
		this.layer.resizeWorld() ;

		
		this.map.setCollisionBetween(0 , 500);
		this.map.setCollision([155,135] , false) ;

		this.map.setTileIndexCallback(0 , this.resetPlayer , this );
		this.map.setTileIndexCallback(2 , this.getCoin , this );
		

		this.player = this.add.sprite(75 , 800 , 'player');
		this.player.anchor.setTo(0.5,0.5);
		

		this.player.animations.add('idle' , [0,1] , 1 , true);
		this.player.animations.add('jump' , [2] , 1 , true);
		this.player.animations.add('run' , [3,4,5,6,7,8,9] , 7 , true);
		this.physics.arcade.enable(this.player);
		this.camera.follow(this.player);

		this.player.body.collideWorldBounds = true ;

		this.controls = {
			right : this.input.keyboard.addKey(Phaser.Keyboard.D),
			left : this.input.keyboard.addKey(Phaser.Keyboard.A),
			up : this.input.keyboard.addKey(Phaser.Keyboard.W),
			down : this.input.keyboard.addKey(Phaser.Keyboard.S),
			fireButtonI : this.input.keyboard.addKey(Phaser.Keyboard.I),
			fireButtonJ : this.input.keyboard.addKey(Phaser.Keyboard.J),
			fireButtonK : this.input.keyboard.addKey(Phaser.Keyboard.K),
			fireButtonL : this.input.keyboard.addKey(Phaser.Keyboard.L),
		};

		
		this.scoreText = this.add.text(800,50,'Score' , {font : '32px Arial' , fill : '#fff'});
		this.winText = this.add.text(this.world.centerX , this.world.centerY , 'You Win!',  {font : '32px Arial' , fill : '#fff'} ) ;
		this.winText.visible = false ;

	},

	update : function(){
		this.physics.arcade.collide(this.player , this.layer);

		this.player.body.velocity.x = 0 ;
		this.player.body.velocity.y = 0 ;


		this.physics.arcade.overlap(this.bullets , this.enemies , this.collisionHandler , null , this) ;
		this.physics.arcade.overlap(this.bullets , this.enemies2 , this.collisionHandler , null , this) ;
		this.physics.arcade.overlap(this.bullets , this.enemies3 , this.collisionHandler , null , this) ;
		this.physics.arcade.overlap(this.bullets , this.enemies4 , this.collisionHandler , null , this) ;
		this.physics.arcade.overlap(this.player , this.enemies , this.collisionHandlerForPlayer , null , this) ;
		this.physics.arcade.overlap(this.player , this.enemies2 , this.collisionHandlerForPlayer , null , this) ;
		this.physics.arcade.overlap(this.player , this.enemies3 , this.collisionHandlerForPlayer , null , this) ;
		this.physics.arcade.overlap(this.player , this.enemies4 , this.collisionHandlerForPlayer , null , this) ;


		if(this.controls.up.isDown){
			this.player.animations.play('run');
			this.player.scale.setTo(1,1);
			this.player.body.velocity.y -= this.playerSpeed ;
		}

		if(this.controls.down.isDown){
			this.player.animations.play('run');
			this.player.scale.setTo(-1,1);
			this.player.body.velocity.y += this.playerSpeed ;
		}		
		

		if(this.controls.right.isDown){
			this.player.animations.play('run');
			this.player.scale.setTo(1,1);
			this.player.body.velocity.x += this.playerSpeed ;
		}

		if(this.controls.left.isDown){
			this.player.animations.play('run');
			this.player.scale.setTo(-1,1);
			this.player.body.velocity.x -= this.playerSpeed ;
		}		

		if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0){
			this.player.animations.play('idle');
		}

		if(this.controls.fireButtonI.isDown){
				if(this.time.now > this.bulletTime){
				bullet = this.bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(this.player.x , this.player.y);
					bullet.body.velocity.y = -200 ; 
					this.bulletTime = this.time.now + 1000 ;
				}
			}
		}

		if(this.controls.fireButtonJ.isDown){
			if(this.time.now > this.bulletTime){
				bullet = this.bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(this.player.x , this.player.y);
					bullet.body.velocity.x = -200 ; 
					this.bulletTime = this.time.now + 1000 ;
				}
			}
		}

		if(this.controls.fireButtonK.isDown){
			if(this.time.now > this.bulletTime){
				bullet = this.bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(this.player.x , this.player.y);
					bullet.body.velocity.y = +200 ; 
					this.bulletTime = this.time.now + 1000 ;
				}
			}
		}

		if(this.controls.fireButtonL.isDown){
			if(this.time.now > this.bulletTime){
				bullet = this.bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(this.player.x , this.player.y);
					bullet.body.velocity.x = +200 ; 
					this.bulletTime = this.time.now + 1000 ;
				}
			}
		}


		this.scoreText.text = 'Score : ' + this.score ;

		if(this.score === 8){
			this.winText.visible = true ;
			this.scoreText.visible = false ;
		}

	},

	resetPlayer: function(){
		this.player.reset(100 , 700 );
	},

	getCoin : function(){
		this.map.putTile(-1 , this.layer.getTileX(this.player.x), this.layer.getTileY(this.player.y)) ;
	},

	collisionHandler : function(bullet , enemy ){
		console.log('Collision handler called '); 
		bullet.kill();
		enemy.kill() ; 
		this.score ++ ;
		console.log("Score " , this.score ) ;
	},

	collisionHandlerForPlayer : function(player , enemy){
		this.resetPlayer() ; 
	},

	createEnemies : function(){
		var enemy = this.factory.createEnemy(this.enemies);
		var enemy2 = this.factory.createEnemy(this.enemies);
		var enemy3 = this.factory.createEnemy(this.enemies2);
		var enemy4 = this.factory.createEnemy(this.enemies2);
		var enemy5 = this.factory.createEnemy(this.enemies3);
		var enemy6 = this.factory.createEnemy(this.enemies3);
		var enemy7 = this.factory.createEnemy(this.enemies4);
		var enemy8 = this.factory.createEnemy(this.enemies4);



		this.enemies.x = 600;
		this.enemies.y = 650 ;

		this.enemies2.x = 300;
		this.enemies2.y = 400 ;

		this.enemies3.x = 600;
		this.enemies3.y = 100 ;

		this.enemies4.x = 25;
		this.enemies4.y = 10 ;


		var tween2 = this.add.tween(enemy2).to({x : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween2.onLoop.add(this.descend , this);
		var tween4 = this.add.tween(enemy4).to({x : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween4.onLoop.add(this.descend , this);
		var tween6 = this.add.tween(enemy6).to({x : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween6.onLoop.add(this.descend , this);
		var tween8 = this.add.tween(enemy8).to({x : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween8.onLoop.add(this.descend , this);


		var tween = this.add.tween(enemy).to({y : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween.onLoop.add(this.descend , this);
		var tween3 = this.add.tween(enemy3).to({y : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween3.onLoop.add(this.descend , this);
		var tween5 = this.add.tween(enemy5).to({y : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween5.onLoop.add(this.descend , this);
		var tween7 = this.add.tween(enemy7).to({y : 200 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween7.onLoop.add(this.descend , this);
	},

	descend : function(){
		this.enemies.y =+ 10 ;
	},
	
	


}; 