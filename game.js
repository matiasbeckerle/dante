var config = {
  type: Phaser.AUTO,
  /*width: 1920,
  height: 1080,*/
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var theme;
var characters = [];

function preload() {
  var self = this;

  self.load.audio('theme', [
    'assets/MusicLFiles_-_The_Lament_Of_The_Warfields.ogg',
    'assets/MusicLFiles_-_The_Lament_Of_The_Warfields.mp3'
  ]);

  // Load voice
  data.characters.forEach(characterData => {
    self.load.audio(characterData.voice, [`assets/voice/${characterData.voice}`]);
  });

  self.load.image('sky', 'assets/sky.png');
  self.load.spritesheet('brawler', 'assets/brawler48x48.png', {
    frameWidth: 48, frameHeight: 48
  });
}

function create() {
  var self = this;

  self.add.image(400, 300, 'sky');

  var graphics = self.add.graphics({ fillStyle: { color: 0x0000aa } });

  self.add.text(20, 20, 'FULLSCREEN', { fill: '#FFFFFF' })
    .setShadow(2, 2, '#000000', 2, false, true)
    .setInteractive()
    .on('pointerdown', function () {
      if (self.scale.isFullscreen) {
        self.scale.stopFullscreen();
        this.setText('FULLSCREEN');
      } else {
        self.scale.startFullscreen();
        this.setText('CHIUDERE');
      }
    });

  self.add.text(20, 1040, 'CREDITI', { fill: '#FFFFFF' })
    .setShadow(2, 2, '#000000', 2, false, true)
    .setInteractive()
    .on('pointerdown', function () {
      var rect = new Phaser.Geom.Rectangle(560, 240, 800, 600);
      graphics.fillRectShape(rect);
    });

  data.characters.forEach(characterData => {
    var character = self.add.sprite(characterData.x, characterData.y, 'brawler').setInteractive();

    character.on('pointerdown', function () {
      var voice = self.sound.add(characterData.voice);
      voice.play();
    });

    characters.push(character);
  });

  self.anims.create({
    key: 'idle',
    frames: self.anims.generateFrameNumbers('brawler', { frames: [5, 6, 7, 8] }),
    frameRate: 8,
    repeat: -1
  });

  theme = self.sound.add('theme', { loop: true });
  theme.volume = 0.2;
  theme.play();
}

function update() {
  characters.forEach(character => {
    character.anims.play('idle', true);
  });
}