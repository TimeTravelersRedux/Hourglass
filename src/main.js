import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import GameOverState from './states/GameOver'
import config from './config'

export default class Game extends Phaser.Game {
  constructor() {
    super(960, 600, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('GameOver',GameOverState,false)
  }

  startGame(key, clearWorld, clearCache, parameter) {
    //Parameters is players
    //Method is invoked in sockets.js
    this.state.start(key, clearWorld, clearCache, parameter)
  }

  init(){
    game.stage.disableVisibilityChange = true;
};
}
