import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import GameMenu from './MainMenu.js'

export default class extends Phaser.State {
  init () {}


  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('hero', '/assets/platformerGraphicsDeluxe_Updated/Player/p1_walk/p1_walk.png', 67, 92, 8)
    this.load.spritesheet('player', '/assets/platformerGraphicsDeluxe_Updated/Player/p3_walk/p3_walk.png', 67, 92, 8)

    this.load.json('level:1', '/assets/data/level01.json')

    this.load.image('font:numbers', '/assets/images/numbers.png')
    this.load.image('background', '/assets/images/stars4.jpg')
    this.load.image('gameOver', '/assets/images/stars-07.jpg')

    this.load.image('ground', '/assets/images/ground.png')
    this.load.image('grass:8x1', '/assets/images/grass_8x1.png')
    this.load.image('grass:6x1', '/assets/images/grass_6x1.png')
    this.load.image('grass:4x1', '/assets/images/grass_4x1.png')
    this.load.image('grass:2x1', '/assets/images/grass_2x1.png')
    this.load.image('grass:1x1', '/assets/images/grass_1x1.png')
    this.load.image('invisible-wall', '/assets/images/invisible_wall.png')
    this.load.image('icon:coin', '/assets/images/coin_icon.png')
    this.load.image('key', '/assets/images/key.png')
    this.load.image('logo', '/assets/images/HourglassRedux2.png')


    this.load.spritesheet('coin', '/assets/images/coin_animated.png', 22, 22)
    this.load.spritesheet('spider', '/assets/images/spider.png', 42, 32)
    // this.load.spritesheet('hero', '/assets/images/platformerGraphicsDeluxe_Updated/Player/p1_walk/p1_walk.png', 73, 97)
    this.load.spritesheet('door', '/assets/images/door.png', 42, 66)
    this.load.spritesheet('icon:key', '/assets/images/key_icon.png', 34, 30)

    this.load.audio('sfx:background', 'assets/audio/finaltrimmed.ogg')
    this.load.audio('sfx:jump', 'assets/audio/jump.wav')
    this.load.audio('sfx:coin', 'assets/audio/coin.wav')
    this.load.audio('sfx:stomp', 'assets/audio/stomp.wav')
    this.load.audio('sfx:key', 'assets/audio/key.wav')
    this.load.audio('sfx:door', 'assets/audio/door.wav')

    this.state.add("GameMenu", GameMenu)
  }

  create () {
       this.state.start('Game')

      // setTimeout(function () {
      //   this.state.start("GameMenu");
      // }, 1000);
    }

  update() {}
}
