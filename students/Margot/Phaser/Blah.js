var game 
game = new Phaser.Game(523, 570, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update
}, true) // true here means that the game background is going to be transparent

var player,
	invisiWalls;


function preload() {
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.image('maze', 'assets/maze.png');
}

// set up the game
function create() {

	// give the game canvas an ID so that we can style it with CSS
	game.canvas.id = 'game'

	game.world.setBounds(0, 0, 523, 550);
	game.add.tileSprite(0, 20, game.world.width, game.world.height, 'maze');

    // give the game world some physics rules
    game.physics.startSystem(Phaser.Physics.ARCADE)

    // create the player
    player = game.add.sprite(0, 0, 'dude');
    player.x = 0;
    player.y = 0;
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true // so that player doesn't fall off the screen

        // create pig walking animations
    player.animations.add('up', [4], 10, true)
    player.animations.add('left', [0,1,2,3], 10, true)
    player.animations.add('right', [5,6,7,8], 10, true)
    player.animations.add('down', [4], 10, true)

    // create the controls
    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);

    //maze walls
    invisiWalls= game.add.group();
	invisiWalls.enableBody = true;

	function invisiWall(x, y, width, height) {
	var ledge = new Phaser.TileSprite(game, x, y, width, height);
	invisiWalls.add(ledge);
    }

    invisiWall(0, 0, 1, game.world.height); //mur gauche
    invisiWall(45, 20, game.world.width, 1); //mur haut
}   

var playerSpeed = 200

// called every single frame
function update() {

    // make the dude animate in four directions
    if (cursors.right.isDown) {
        player.animations.play('right')
    } else if (cursors.left.isDown) {
        player.animations.play('left')
    } else if (cursors.up.isDown) {
        player.animations.play('up')
    } else if (cursors.down.isDown) {
        player.animations.play('down')
    } else {
        player.animations.stop()
    }

    // stop the dude by default
    player.body.velocity.x = 0
    player.body.velocity.y = 0


    // make the dude animate and move in four directions
    if (cursors.right.isDown) {
        player.animations.play('right')
        player.body.velocity.x = playerSpeed
    } else if (cursors.left.isDown) {
        player.animations.play('left')
        player.body.velocity.x = -playerSpeed
    } else if (cursors.up.isDown) {
        player.animations.play('up')
        player.body.velocity.y = -playerSpeed
    } else if (cursors.down.isDown) {
        player.animations.play('down')
        player.body.velocity.y = playerSpeed
    } else {
        player.animations.stop()
    }

}