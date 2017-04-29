/* globals __DEV__ */
import Phaser from 'phaser'
import Hero from '../sprites/hero'
import Spider from '../sprites/spider'
import Player from '../sprites/player'
import Client from '../js/client'


export default class extends Phaser.State {
  init() {
    this.playerMap = {}
    this.game.renderer.renderSession.roundPixels = true

    this.keys = this.game.input.keyboard.addKeys({
      left: Phaser.KeyCode.LEFT,
      right: Phaser.KeyCode.RIGHT,
      up: Phaser.KeyCode.UP
    })

    this.keys.up.onDown.add(function() {
      let didJump = this.hero.jump()
      if (didJump) {
        this.sfx.jump.play()
      }
    }, this)

    this.coinPickupCount = 0
    this.hasKey = false

  }
  preload() {}

  create() {

    // create sound entities
    this.sfx = {
      jump: this.game.add.audio('sfx:jump'),
      coin: this.game.add.audio('sfx:coin'),
      stomp: this.game.add.audio('sfx:stomp'),
      key: this.game.add.audio('sfx:key'),
      door: this.game.add.audio('sfx:door')
    }

    // create level
    this.game.add.image(0, 0, 'background')
    this._loadLevel(this.game.cache.getJSON('level:1'))


    // create hudå with scoreboards)
    this._createHud()

    this.game.add.existing(this.hero)

    socket.askNewPlayer()

  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.hero, 32, 32)
    }
  }

  addNewPlayer(id, x, y) {
    let player = new Player({
      game: this.game,
      x: x,
      y: y,
      asset: 'hero'
    })

    this.playerMap[id] = this.game.add.existing(player)
  }

  removePlayer(id) {
    this.playerMap[id].kill()
  }

  _loadLevel(data) {
    // create all the groups/layers that we need
    this.bgDecoration = this.game.add.group()
    this.platforms = this.game.add.group()
    this.coins = this.game.add.group()
    this.spiders = this.game.add.group()
    this.enemyWalls = this.game.add.group()
    this.enemyWalls.visible = false

    // spawn all platforms
    data.platforms.forEach(this._spawnPlatform, this)
      // spawn hero and enemies
    this._spawnCharacters({ hero: data.hero, spiders: data.spiders })
      // spawn important objects
    data.coins.forEach(this._spawnCoin, this)
    this._spawnDoor(data.door.x, data.door.y)
    this._spawnKey(data.key.x, data.key.y)

    // enable gravity
    const GRAVITY = 1200
    this.game.physics.arcade.gravity.y = GRAVITY
  }

  _spawnPlatform(platform) {
    let sprite = this.platforms.create(
      platform.x, platform.y, platform.image)

    this.game.physics.enable(sprite)
    sprite.body.allowGravity = false
    sprite.body.immovable = true

    this._spawnEnemyWall(platform.x, platform.y, 'left')
    this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right')
  }

  _spawnEnemyWall(x, y, side) {
    let sprite = this.enemyWalls.create(x, y, 'invisible-wall')
      // anchor and y displacement
    sprite.anchor.set(side === 'left' ? 1 : 0, 1)
      // physic properties
    this.game.physics.enable(sprite)
    sprite.body.immovable = true
    sprite.body.allowGravity = false
  }

  _spawnCharacters(data) {
    // spawn spiders
    data.spiders.forEach(function(spider) {
        let sprite = new Spider({
          game: this.game,
          x: spider.x,
          y: spider.y,
          asset: 'spider'
        })
      },
      this)

    // spawn hero

    this.hero = new Hero({
      game: this.game,
      x: data.hero.x,
      y: data.hero.y,
      asset: 'hero'
    })
  }

  _spawnCoin(coin) {
    let sprite = this.coins.create(coin.x, coin.y, 'coin')
    sprite.anchor.set(0.5, 0.5)

    this.game.physics.enable(sprite)
    sprite.body.allowGravity = false

    sprite.animations.add('rotate', [0, 1, 2, 1], 6, true) // 6fps, looped
    sprite.animations.play('rotate')
  }

  _spawnDoor(x, y) {
    this.door = this.bgDecoration.create(x, y, 'door')
    this.door.anchor.setTo(0.5, 1)
    this.game.physics.enable(this.door)
    this.door.body.allowGravity = false
  }

  _spawnKey(x, y) {
    this.key = this.bgDecoration.create(x, y, 'key')
    this.key.anchor.set(0.5, 0.5)
      // enable physics to detect collisions, so the hero can pick the key up
    this.game.physics.enable(this.key)
    this.key.body.allowGravity = false
      // add a small 'up & down' animation via a tween
    this.key.y -= 3
    this.game.add.tween(this.key)
      .to({ y: this.key.y + 6 }, 800, Phaser.Easing.Sinusoidal.InOut)
      .yoyo(true)
      .loop()
      .start()
  }


  _onHeroVsCoin(hero, coin) {
    this.sfx.coin.play()
    coin.kill()
    this.coinPickupCount++
  }

  _onHeroVsEnemy(hero, enemy) {
    if (hero.body.velocity.y > 0) { // kill enemies when hero is falling
      hero.bounce()
      enemy.die()
      this.sfx.stomp.play()
    } else { // game over -> restart the game
      this.sfx.stomp.play()
      this.game.state.restart()
    }
  }

  _onHeroVsKey(hero, key) {
    this.sfx.key.play()
    key.kill()
    this.hasKey = true
  }

  _onHeroVsDoor(hero, door) {
    this.sfx.door.play()
    this.game.state.restart()
      // TODO: go to the next level instead
  }

  _createHud() {
    const NUMBERS_STR = '0123456789X '
    this.coinFont = this.game.add.retroFont('font:numbers', 20, 26,
      NUMBERS_STR)

    this.keyIcon = this.game.make.image(0, 19, 'icon:key')
    this.keyIcon.anchor.set(0, 0.5)
    let coinIcon = this.game.make.image(this.keyIcon.width + 7, 0, 'icon:coin')

    this.hud = this.game.add.group()
    this.hud.add(coinIcon)
    this.hud.add(this.keyIcon)
    this.hud.position.set(10, 10)
  }

  update() {
    this._handleCollisions()
    this._handleInput()

    this.keyIcon.frame = this.hasKey ? 1 : 0
  }

  _handleCollisions() {
    this.game.physics.arcade.collide(this.spiders, this.platforms)
    this.game.physics.arcade.collide(this.spiders, this.enemyWalls)
    this.game.physics.arcade.collide(this.hero, this.platforms)
    this.game.physics.arcade.overlap(this.hero, this.coins, this._onHeroVsCoin,
      null, this)
    this.game.physics.arcade.overlap(this.hero, this.spiders,
      this._onHeroVsEnemy, null, this)
    this.game.physics.arcade.overlap(this.hero, this.key, this._onHeroVsKey,
      null, this)
    this.game.physics.arcade.overlap(this.hero, this.door, this._onHeroVsDoor,
      // ignore if there is no key or the player is on air
      function(hero, door) {
        return this.hasKey && hero.body.touching.down
      }, this)

    if (this.hasPlayers) {
      let obj = this.playerMap
      for (key in obj)
        this.game.physics.arcade.collide(obj[key], this.platforms)
      this.game.physics.arcade.overlap(obj[key], this.coins, this._onHeroVsCoin,
        null, this)
      this.game.physics.arcade.overlap(obj[key], this.spiders,
        this._onHeroVsEnemy, null, this)
      this.game.physics.arcade.overlap(obj[key], this.key, this._onHeroVsKey,
        null, this)
      this.game.physics.arcade.overlap(obj[key], this.door, this._onHeroVsDoor,
        // ignore if there is no key or the player is on air
        function(hero, door) {
          return this.hasKey && hero.body.touching.down
        }, this)
    }

  }

  _handleInput() {
    if (this.keys.left.isDown) { // move hero left
      this.hero.move(-1)
    } else if (this.keys.right.isDown) { // move hero right
      this.hero.move(1)
    } else { // stop
      this.hero.move(0)
    }
  }


}
