import Phaser from 'phaser'
var GameMenu = function() {};


export default class extends Phaser.State {

  init() {
    this.menuConfig = {
      startY: 260,
      startX: 30
    }
    this.titleText = game.make.text(game.world.centerX, 100, "Hourglass Redux", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    })
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
    this.titleText.anchor.set(0.5)
    this.optionCount = 1

    this.instructionText = game.make.text(game.world.centerX, 100, "Collect coins, and get the key to advance to the next level. Press down to shoot your opponent back in time -- but beware! It costs 3 coins!", {
      font: 'bold 25pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    })

  }

  create() {
    game.stage.disableVisibilityChange = true
    game.add.existing(this.titleText)
    game.add.existing(this.instructionText)

    this.addMenuOption('Start', function () {
      this.game.state.start("Game")
    })

    // this.state.start('Game')


    // this.addMenuOption('Options', function () {
    //   game.state.start("Options")
    // })
    // this.addMenuOption('Credits', function () {
    //   game.state.start("Credits")
    // })
  }
}

// Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
