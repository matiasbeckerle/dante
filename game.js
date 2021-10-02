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
  theme.volume = 0.3;
  theme.play();
}

function update() {
  characters.forEach(character => {
    character.anims.play('idle', true);
  });
}