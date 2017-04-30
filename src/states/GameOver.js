import Phaser from 'phaser'

export default class extends Phaser.State {
  init() {
    this.menuConfig = {
      className: "inverse",
      startY: 260,
      startX: "center"
    }
    this.game.add.image(0, 0, 'gameOver')
    this.game.add.image(0, 0, 'logo')

    this.titleText = this.game.make.text(this.game.world.centerX, 400, "Click to restart!", {
      font: 'bold 40pt TheMinion',
      fill: '#00e9ff',
      align: 'right'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);


    const whoWon = (Hourglass.winnerPickupCount === Hourglass.game.state.states.Game.hero.coinPickupCount) ? "You won!" : "You lost!"

    this.whoWon = this.game.make.text(this.game.world.centerX, 100, whoWon, {
      font: 'bold 40pt TheMinion',
      fill: '#f2ff00',
      align: 'center'
    });
    this.whoWon.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.whoWon.anchor.set(0.5);

    this.scoreText = this.game.make.text(this.game.world.centerX, 510, `Your score: ${Hourglass.game.state.states.Game.hero.coinPickupCount}. Click to restart!`, {
      font: 'bold 40pt TheMinion',
      fill: '#ff4287',
      align: 'right'
    });
    this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.scoreText.anchor.set(0.5);

  }

  create() {
    // this.game.add.existing(this.titleText)
    this.game.add.existing(this.scoreText)
      this.game.add.existing(this.whoWon)
  }

  update() {
    if (this.game.input.activePointer.isDown) {
      socket.emit('restart')
    }
  }

}
