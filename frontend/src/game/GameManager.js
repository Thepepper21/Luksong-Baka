import Phaser from 'phaser'
import GameScene from './scenes/GameScene'
import MenuScene from './scenes/MenuScene'

export function createGame(container, eventHandlers) {
  const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    parent: container,
    backgroundColor: '#87CEEB',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 800 },
        debug: false
      }
    },
    scene: [MenuScene, GameScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      min: {
        width: 800,
        height: 450
      },
      max: {
        width: 1600,
        height: 900
      }
    }
  }

  const game = new Phaser.Game(config)
  
  // Pass event handlers to scenes
  game.registry.set('eventHandlers', eventHandlers)
  
  return game
}
