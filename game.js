var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var theme;
var character1, character2, character3, character4;
var character1Speach, character2Speach, character3Speach, character4Speach;

function preload() {
  this.load.audio('theme', [
    'assets/MusicLFiles_-_The_Lament_Of_The_Warfields.ogg',
    'assets/MusicLFiles_-_The_Lament_Of_The_Warfields.mp3'
  ]);
  this.load.audio('character1Speach', ['assets/It-ciao.ogg']);
  this.load.audio('character2Speach', ['assets/It-arrivederci.ogg']);
  this.load.audio('character3Speach', ['assets/De-Pasta2.ogg']);
  this.load.audio('character4Speach', ['assets/De-Mortadella.ogg']);
  this.load.image('sky', 'assets/sky.png');
  this.load.spritesheet('brawler', 'assets/brawler48x48.png', {
    frameWidth: 48, frameHeight: 48
  });
}

function create() {
  this.add.image(400, 300, 'sky');

  character1 = this.add.sprite(100, 450, 'brawler').setInteractive();
  character2 = this.add.sprite(300, 400, 'brawler').setInteractive();
  character3 = this.add.sprite(500, 400, 'brawler').setInteractive();
  character4 = this.add.sprite(700, 450, 'brawler').setInteractive();

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('brawler', { frames: [5, 6, 7, 8] }),
    frameRate: 8,
    repeat: -1
  });

  character1Speach = this.sound.add('character1Speach');
  character2Speach = this.sound.add('character2Speach');
  character3Speach = this.sound.add('character3Speach');
  character4Speach = this.sound.add('character4Speach');

  theme = this.sound.add('theme', { loop: true });
  theme.volume = 0.3;
  theme.play();

  character1.on('pointerdown', function () {
    character1Speach.play();
  });

  character2.on('pointerdown', function () {
    character2Speach.play();
  });

  character3.on('pointerdown', function () {
    character3Speach.play();
  });

  character4.on('pointerdown', function () {
    character4Speach.play();
  });
}

function update() {
  character1.anims.play('idle', true);
  character2.anims.play('idle', true);
  character3.anims.play('idle', true);
  character4.anims.play('idle', true);
}