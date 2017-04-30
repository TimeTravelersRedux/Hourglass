import Phaser from 'phaser'

export default class extends Phaser.State {
  init() {
    this.menuConfig = {
      className: "inverse",
      startY: 260,
      startX: "center"
    }
    this.titleText = this.game.make.text(this.game.world.centerX, 100, "Click to restart!", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);

  }

  create() {
    this.game.add.existing(this.titleText)
  }

  update() {
    if (this.game.input.activePointer.isDown) {
      this.state.start('Game');
    }
  }

}
