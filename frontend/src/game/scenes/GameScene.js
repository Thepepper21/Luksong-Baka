import Phaser from 'phaser'
import Player from '../entities/Player'
import Bull from '../entities/Bull'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
    
    this.player = null
    this.bull = null
    this.platforms = null
    this.cursors = null
    this.wasdKeys = null
    
    // Game state
    this.score = 0
    this.lives = 3
    this.gameTime = 0
    this.gameStarted = false
    this.gameOver = false
    
    // UI elements
    this.scoreText = null
    this.livesText = null
    this.timeText = null
    
    // Timers
    this.scoreTimer = null
    this.gameTimer = null
    
    // Event handlers from Vue
    this.eventHandlers = null
  }

  preload() {
    // Create simple colored rectangles as sprites
    this.createSimpleSprites()
  }

  create() {
    // Get event handlers from registry
    this.eventHandlers = this.registry.get('eventHandlers')
    
    // Create world
    this.createWorld()
    this.createPlayer()
    this.createBull()
    this.createUI()
    this.setupInput()
    this.setupCollisions()
    this.startGame()
  }

  createSimpleSprites() {
    // Create a simple ground texture
    const groundGraphics = this.add.graphics()
    groundGraphics.fillStyle(0x228B22) // Forest green
    groundGraphics.fillRect(0, 0, 64, 32)
    groundGraphics.generateTexture('ground', 64, 32)
    groundGraphics.destroy()

    // Create player sprite (blue rectangle)
    const playerGraphics = this.add.graphics()
    playerGraphics.fillStyle(0x0066CC) // Blue
    playerGraphics.fillRect(0, 0, 32, 48)
    playerGraphics.generateTexture('player', 32, 48)
    playerGraphics.destroy()

    // Create bull sprite (brown rectangle)
    const bullGraphics = this.add.graphics()
    bullGraphics.fillStyle(0x8B4513) // Saddle brown
    bullGraphics.fillRect(0, 0, 64, 48)
    bullGraphics.generateTexture('bull', 64, 48)
    bullGraphics.destroy()

    // Create sky background
    this.add.rectangle(512, 288, 1024, 576, 0x87CEEB)
  }

  createWorld() {
    // Create platforms group
    this.platforms = this.physics.add.staticGroup()
    
    // Create ground
    for (let x = 0; x < 1024; x += 64) {
      this.platforms.create(x + 32, 568, 'ground')
    }
    
    // Add some floating platforms
    this.platforms.create(200, 450, 'ground')
    this.platforms.create(400, 350, 'ground')
    this.platforms.create(600, 450, 'ground')
    this.platforms.create(800, 350, 'ground')
  }

  createPlayer() {
    this.player = new Player(this, 100, 450)
    this.physics.add.collider(this.player.sprite, this.platforms)
  }

  createBull() {
    this.bull = new Bull(this, 900, 520)
    this.physics.add.collider(this.bull.sprite, this.platforms)
  }

  createUI() {
    // Score
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    })

    // Lives
    this.livesText = this.add.text(16, 50, 'Lives: ❤️❤️❤️', {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    })

    // Time
    this.timeText = this.add.text(16, 84, 'Time: 0:00', {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    })

    // Instructions
    this.add.text(512, 50, 'WASD or Arrow Keys to move • SPACE to jump', {
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 1
    }).setOrigin(0.5)
  }

  setupInput() {
    // Create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys()
    
    // Create WASD keys
    this.wasdKeys = this.input.keyboard.addKeys('W,S,A,D,SPACE')
  }

  setupCollisions() {
    // Player-Bull collision
    this.physics.add.overlap(this.player.sprite, this.bull.sprite, this.hitBull, null, this)
  }

  startGame() {
    if (this.gameStarted) return
    
    this.gameStarted = true
    this.gameOver = false
    
    // Notify Vue component
    if (this.eventHandlers?.gameStarted) {
      this.eventHandlers.gameStarted()
    }
    
    // Start score timer (1 point every 2 seconds)
    this.scoreTimer = this.time.addEvent({
      delay: 2000,
      callback: this.addScore,
      callbackScope: this,
      loop: true
    })
    
    // Start game timer
    this.gameTimer = this.time.addEvent({
      delay: 1000,
      callback: this.updateGameTime,
      callbackScope: this,
      loop: true
    })
  }

  update() {
    if (this.gameOver) return
    
    // Update player
    if (this.player) {
      this.player.update(this.cursors, this.wasdKeys)
    }
    
    // Update bull
    if (this.bull) {
      this.bull.update()
    }
  }

  addScore() {
    if (this.gameOver) return
    
    this.score += 1
    this.updateScoreDisplay()
    
    // Notify Vue component
    if (this.eventHandlers?.updateScore) {
      this.eventHandlers.updateScore(this.score)
    }
  }

  updateGameTime() {
    if (this.gameOver) return
    
    this.gameTime += 1
    this.updateTimeDisplay()
    
    // Notify Vue component
    if (this.eventHandlers?.updateTime) {
      this.eventHandlers.updateTime(this.gameTime)
    }
    
    // Increase bull speed over time
    if (this.bull && this.gameTime % 10 === 0) {
      this.bull.increaseSpeed()
    }
  }

  hitBull() {
    if (this.gameOver) return
    
    this.lives -= 1
    this.updateLivesDisplay()
    
    // Notify Vue component
    if (this.eventHandlers?.updateLives) {
      this.eventHandlers.updateLives(this.lives)
    }
    
    // Flash effect
    this.cameras.main.flash(200, 255, 0, 0)
    
    // Move player to safe position
    this.player.sprite.setPosition(100, 450)
    this.player.sprite.setVelocity(0, 0)
    
    // Brief invincibility
    this.player.sprite.setTint(0xff0000)
    this.time.delayedCall(1000, () => {
      if (this.player?.sprite) {
        this.player.sprite.clearTint()
      }
    })
    
    if (this.lives <= 0) {
      this.endGame()
    }
  }

  endGame() {
    this.gameOver = true
    
    // Stop timers
    if (this.scoreTimer) {
      this.scoreTimer.remove()
    }
    if (this.gameTimer) {
      this.gameTimer.remove()
    }
    
    // Stop entities
    if (this.player?.sprite) {
      this.player.sprite.setVelocity(0, 0)
    }
    if (this.bull?.sprite) {
      this.bull.sprite.setVelocity(0, 0)
    }
    
    // Notify Vue component
    if (this.eventHandlers?.gameOver) {
      this.eventHandlers.gameOver(this.score, this.gameTime)
    }
    
    // Show game over text
    const gameOverText = this.add.text(512, 288, 'GAME OVER', {
      fontSize: '64px',
      fontFamily: 'Arial, sans-serif',
      color: '#ff0000',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5)
    
    // Fade in effect
    gameOverText.setAlpha(0)
    this.tweens.add({
      targets: gameOverText,
      alpha: 1,
      duration: 1000,
      ease: 'Power2'
    })
  }

  updateScoreDisplay() {
    if (this.scoreText) {
      this.scoreText.setText(`Score: ${this.score}`)
    }
  }

  updateLivesDisplay() {
    if (this.livesText) {
      const hearts = '❤️'.repeat(this.lives) + '🤍'.repeat(3 - this.lives)
      this.livesText.setText(`Lives: ${hearts}`)
    }
  }

  updateTimeDisplay() {
    if (this.timeText) {
      const minutes = Math.floor(this.gameTime / 60)
      const seconds = this.gameTime % 60
      this.timeText.setText(`Time: ${minutes}:${seconds.toString().padStart(2, '0')}`)
    }
  }
}
