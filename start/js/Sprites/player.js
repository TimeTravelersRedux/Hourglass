//
// Player sprite
//
function Player(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'hero');
  this.anchor.set(0.5, 0.5);

  // physic properties
  this.game.physics.enable(this);
  this.body.collideWorldBounds = true;

  this.animations.add('stop', [0]);
  this.animations.add('run', [1, 2], 8, true); // 8fps looped
  this.animations.add('jump', [3]);
  this.animations.add('fall', [4]);
}

// inherit from Phaser.Sprite
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.jump = function() {
  const JUMP_SPEED = 600;
  let canJump = this.body.touching.down;

  if (canJump) {
    this.body.velocity.y = -JUMP_SPEED;
  }

  return canJump;
};

Player.prototype.bounce = function() {
  const BOUNCE_SPEED = 200;
  this.body.velocity.y = -BOUNCE_SPEED;
};

Player.prototype.update = function() {
  // update sprite animation, if it needs changing
  let animationName = this._getAnimationName();
  if (this.animations.name !== animationName) {
    this.animations.play(animationName);
  }
};

Player.prototype._getAnimationName = function() {
  let name = 'stop'; // default animation

  // jumping
  if (this.body.velocity.y < 0) {
    name = 'jump';
  }
  // falling
  else if (this.body.velocity.y >= 0 && !this.body.touching.down) {
    name = 'fall';
  } else if (this.body.velocity.x !== 0 && this.body.touching.down) {
    name = 'run';
  }

  return name;
};
