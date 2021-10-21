var config = {
  type: Phaser.AUTO,
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
var tweens = {};
var fontFamily = 'Trebuchet MS, Tahoma, Helvetica, sans-serif';
var playingVoice;

function preload() {
  var self = this;

  self.load.audio('theme', ['assets/the_lament_of_the_warfields.ogg']);

  data.characters.forEach(characterData => {
    self.load.audio(characterData.voice, [`assets/voice/${characterData.voice}`]);
  });

  data.characters.forEach(characterData => {
    self.load.image(characterData.name, [`assets/characters/${characterData.image}`]);
  });

  self.load.image('background', 'assets/background.png');
  self.load.image('shadow', 'assets/shadow.png');
}

function create() {
  var self = this;

  self.add.image(960, 540, 'background');

  var graphics = self.add.graphics({ fillStyle: { color: 0x0000aa } });

  self.add.text(20, 20, 'SCHERMO PIENO', {
    fontFamily: fontFamily,
    fontStyle: 'bold',
    fontSize: 20,
    fill: '#FFFFFF'
  })
    .setShadow(2, 2, '#000000', 2, false, true)
    .setInteractive()
    .on('pointerdown', function () {
      if (self.scale.isFullscreen) {
        self.scale.stopFullscreen();
        this.setText('SCHERMO PIENO');
      } else {
        self.scale.startFullscreen();
        this.setText('CHIUDERE');
      }
    });

  self.add.text(20, 1040, 'CREDITI', {
    fontFamily: fontFamily,
    fontStyle: 'bold',
    fontSize: 20,
    fill: '#FFFFFF'
  })
    .setShadow(2, 2, '#000000', 2, false, true)
    .setInteractive()
    .on('pointerdown', function () {
      window.open('https://github.com/matiasbeckerle/dante#credits', '_blank');
    });

  data.characters.forEach(characterData => {
    self.add.image(characterData.shadow.x, characterData.shadow.y, 'shadow');

    var character = self.add.image(characterData.x, characterData.y, characterData.name).setInteractive();

    tweens[characterData.name] = self.tweens.add({
      targets: character,
      scaleX: 1.05,
      scaleY: 1.05,
      ease: 'Sine.easeInOut',
      duration: 1000,
      repeat: -1,
      yoyo: true,
      paused: true
    });

    character.on('pointerdown', function (a, b, c, d) {
      if (playingVoice) {
        playingVoice.stop();
      }

      var activeTween = Object.keys(tweens).filter(function (row) {
        return tweens[row].paused === false;
      });

      if (activeTween && activeTween.length === 1) {
        tweens[activeTween].pause();
      }

      playingVoice = self.sound.add(characterData.voice);
      playingVoice.play();
      tweens[character.texture.key].resume();
    });

    character.on('pointerover', function () {
      character.alpha = 0.7;
    });

    character.on('pointerout', function () {
      character.alpha = 1;
    });

    characters.push(character);

    self.add.text(characterData.nameText.x, characterData.nameText.y, characterData.name, {
      fontFamily: fontFamily,
      fontStyle: 'bold',
      fontSize: 24,
      fill: '#b18f4c'
    });
  });

  theme = self.sound.add('theme', { loop: true });
  theme.volume = 0.2;
  theme.play();
}

function update() {
}