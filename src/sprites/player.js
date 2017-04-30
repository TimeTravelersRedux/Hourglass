import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ socketId, game, x, y, asset }) {
    super(game, x, y, asset)
    this.socketId = socketId
    this.anchor.setTo(0.5)
    this.scale.setTo(.5, .5)
    this.game.physics.enable(this)
    this.body.collideWorldBounds = true

    this.animate()
  }

  animate() {
    this.animations.add('stop', [0])
    this.animations.add('run', [1, 2], 8, true) // 8fps looped
    this.animations.add('jump', [3])
    this.animations.add('fall', [4])
  }

  die() {
    this.body.enable = false
    this.kill()
  }

  update() {
    // update sprite animation, if it needs changing
    let animationName = this._getAnimationName()
    if (this.animations.name !== animationName) {
      this.animations.play(animationName)
    }
  }


  _getAnimationName() {
    let name = 'stop' // default animation

    // jumping
    if (this.body.velocity.y < 0) {
      name = 'jump'
    }

    // falling
    else if (this.body.velocity.y >= 0 && !this.body.touching.down) {
      name = 'fall'
    } else if (this.body.velocity.x !== 0 && this.body.touching.down) {
      name = 'run'
    }

    return name
  }
}
