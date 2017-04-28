import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.set(0.5)
    this.SPEED = 100

    this.game.physics.enable(this)
    this.body.collideWorldBounds = true
    this.body.velocity.x = this.SPEED
  }

  animate () {
    this.animations.add('crawl', [0, 1, 2], 8, true) // 8fps, looped
    this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12)
    this.animations.play('crawl')
  }

  update () {
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
      this.body.velocity.x = -this.SPEED // turn left
    } else if (this.body.touching.left || this.body.blocked.left) {
      this.body.velocity.x = this.SPEED // turn right
    }
  }

  die () {
    this.body.enable = false

    this.animations.play('die').onComplete.addOnce(function() {
      this.kill()
    }, this)
  }
}
