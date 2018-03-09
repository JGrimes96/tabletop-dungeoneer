//var game = new Phaser.Game(800,600, Phaser.AUTO, 'tilemap-editor', { preload: preload, create: create, update: update, render: render});

var Game = {};

Game.init = function(){
    this.stage.disableVisibilityChange = true;
};

function preload() {
  this.load.image('ground_1x1', 'assets/ground_1x1.png');
}

var map;
var area;

var marker;
var currentTile = 0;

var cursors;

function create() {

  var mapConfig = {
    map: {
        //data: mapData,
        width: 40,
        height: 30,
    },
    tile: {
        width: 32,
        height: 32,
        texture: 'ground_1x1'
    }
  };

  // Create blank tilemap
  map = this.make.tilemap(mapConfig);

  // Add Tileset image to tilemap
  //map.addTilesetImage('ground_1x1');

  // Create a new blank layer representing an area
  // In this case the area is 40x30 tiles in size
  // Tiles are 32x32 pixels in size
  //area = map.create('area1', 40, 30, 32, 32);

  // Resize the world
  //area.resizeWorld();

  // Create the tile selector palette
  //createTileSelector();

  var tileSelector = this.add.group();

  var tileSelectorBackground = this.add.graphics();
  tileSelectorBackground.fillStyle(0x000000,0.5);
  tileSelectorBackground.fillRect(0,0,800,34);
  //tileSelectorBackground.endFill();

  tileSelector.add(tileSelectorBackground);

  var tileStrip = tileSelector.create(1,1,'ground_1x1').setOrigin(0,0);
  tileStrip.inputEnabled = true;
  tileStrip.events.onInputDown.add(pickTile, this);

  tileSelector.fixedToCamera = true;

  // Tile painting marker
  marker = this.add.graphics();
  marker.lineStyle(2, 0x000000, 1);
  marker.drawRect(0,0,32,32);


  this.input.addMoveCallback(updateMarker, this);
  cursors = this.input.keyboard.createCursorKeys();
}

function pickTile(sprite, pointer) {
  currentTile = this.math.snapToFloor(pointer.x, 32) / 32;
}

function updateMarker() {
  marker.x = area.getTileX(this.input.activePointer.worldX) * 32;
  marker.y = area.getTileY(this.input.activePointer.worldY) * 32;

  if (this.input.mousePointer.isDown) {
    map.putTile(currentTile, area.getTileX(marker.x), area.getTileY(marker.y), area)
  }
}

function update() {
  if (cursors.left.isDown)

    {
        this.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        this.camera.x += 4;
    }

    if (cursors.up.isDown)
    {
        this.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        this.camera.y += 4;
    }
}

function render() {

}

function createTileSelector() {
  // Tile selection window
  var tileSelector = game.add.group();

  var tileSelectorBackground = this.make.graphics();
  tileSelectorBackground.beginFill(0x000000,0.5);
  tileSelectorBackground.drawRect(0,0,800,34);
  tileSelectorBackground.endFill();

  tileSelector.add(tileSelectorBackground);

  var tileStrip = tileSelector.create(1,1,'ground_1x1');
  tileStrip.inputEnabled = true;
  tileStrip.events.onInputDown.add(pickTile, this);

  tileSelector.fixedToCamera = true;

  // Tile painting marker
  marker = this.add.graphics();
  marker.lineStyle(2, 0x000000, 1);
  marker.drawRect(0,0,32,32);
}
