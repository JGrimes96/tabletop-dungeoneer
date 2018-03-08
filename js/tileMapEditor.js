var game = new Phaser.Game(800,600, Phaser.AUTO, 'tilemap-editor', { preload: preload, create: create, update: update, render: render});

function preload() {
  game.load.image();
}
