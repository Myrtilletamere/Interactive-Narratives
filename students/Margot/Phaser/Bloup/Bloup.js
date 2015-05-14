console.log(Phaser);

var game = new Phaser.Game(600, 600, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update,
});

var player,
	cursors,
	platforms;

function preload() {
	console.log('preload');
	game.load.image('sky', 'assets/betterSky.jpg');
	game.load.spritesheet('pow', 'assets/cowthing.png', 64, 72);
	game.load.image('grass', 'assets/betterGrass.png');
}

function create() {
	console.log('create');
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.world.setBounds(0, 0, 2000, game.world.height);
	game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');

	player = game.add.sprite(32, game.world.height -300, 'pow');
	game.physics.arcade.enable(player);
	player.body.gravity.y=400;
	player.body.collideWorldBounds = true;
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	game.camera.follow(player);

	cursors = game.input.keyboard.createCursorKeys();

	platforms = game.add.group();
	platforms.enableBody = true;

	platform(0, game.world.height - 32, game.world.width, 32 );
	platform(100, 100, 200, 32, false);
	platform(300, 300, 100, 32, false); //moves when in contact with player
	platform(200, 500, 100, 32, false);
}

function platform(x, y, width, height, movable) {
	var ledge = new Phaser.TileSprite(game, x, y, width, height, 'grass');
	platforms.add(ledge);
	ledge.body.immovable = !movable; //makes it a variable to change platforms
}

}
var playerSpeed = 200;
var jumpSpeed = 300;
var hasJumped = false;
var jumpButtonReleased = false;

function update(){
	console.log('update');
	game.physics.arcade.collide(player, platforms);
	player.body.velocity.x=0;


	if (cursors.right.isDown){
		player.body.velocity.x= playerSpeed;
		player.animations.play('right');
	} else if (cursors.left.isDown){
		player.body.velocity.x = -playerSpeed;
		player.animations.play('left');
	} else {
		player.animations.stop();
		player.frame =4;
	}
 	
 	//double jump

 	if (player.body.touching.down) {
 		hasJumped = false;
 	}

 	if (cursors.up.isDown ) {
 		player.body.velocity.y = -jumpSpeed;
 		hasJumped = true;
 		jumpButtonReleased = false;

 	}
	else {
 		if (cursors.up.isDown) {
 			jumpButtonReleased= true;
 		}

 		if ( jumpButtonReleased && hasJumped && cursors.up.isDown) {
 			player.body.velocity.y = -jumpSpeed;
 			hasJumped = false;
 		}
 	}


}