import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })
  }

  preload() {
    // Create simple colored rectangles as placeholders for sprites
    this.load.image('sky', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==')
  }

  create() {
    // Add background
    this.add.rectangle(512, 288, 1024, 576, 0x87CEEB)
    
    // Title
    const title = this.add.text(512, 150, 'Luksong Baka', {
      fontSize: '64px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5)

    // Subtitle
    const subtitle = this.add.text(512, 220, 'Press SPACE or ENTER to Start', {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5)

    // Instructions
    const instructions = this.add.text(512, 350, 
      'Use WASD, Arrow Keys, or SPACEBAR to move and jump\n' +
      'Dodge the bull to survive!\n' +
      'You have 3 lives - make them count!', {
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 1,
      align: 'center'
    }).setOrigin(0.5)

    // Add some animation to the title
    this.tweens.add({
      targets: title,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    })

    // Add blinking effect to subtitle
    this.tweens.add({
      targets: subtitle,
      alpha: 0.3,
      duration: 800,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    })

    // Input handling
    this.input.keyboard.on('keydown-SPACE', this.startGame, this)
    this.input.keyboard.on('keydown-ENTER', this.startGame, this)
    
    // Click to start
    this.input.on('pointerdown', this.startGame, this)
  }

  startGame() {
    this.scene.start('GameScene')
  }
}
