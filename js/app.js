var App = {};

App.init = function(){
  console.log('App Initiating');
};

App.init();
Client.sendTest();

var config = {
  type: Phaser.AUTO,//renderer type
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'tilemap-editor',
  scene: { // here you set up which functions you are using for each step in the game loop
    preload: preload,
    create: create,
    update: update,
    render: render
  }
};

var game = new Phaser.Game(config);
