export default class Player {
  constructor(scene, x, y) {
    this.scene = scene
    
    // Create player sprite
    this.sprite = scene.physics.add.sprite(x, y, 'player')
    this.sprite.setBounce(0.2)
    this.sprite.setCollideWorldBounds(true)
    
    // Player properties
    this.speed = 200
    this.jumpPower = 500
    this.isGrounded = false
    
    // Animation properties
    this.lastDirection = 1 // 1 for right, -1 for left
    
    this.setupAnimations()
  }

  setupAnimations() {
    // Simple color changes for movement indication
    this.idleTween = this.scene.tweens.add({
      targets: this.sprite,
      scaleY: 1.05,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
      paused: true
    })
  }

  update(cursors, wasdKeys) {
    if (!this.sprite || !this.sprite.body) return
    
    // Check if player is on ground
    this.isGrounded = this.sprite.body.touching.down
    
    // Horizontal movement
    let moveLeft = false
    let moveRight = false
    let jump = false
    
    // Check cursor keys
    if (cursors.left.isDown) moveLeft = true
    if (cursors.right.isDown) moveRight = true
    if (cursors.up.isDown) jump = true
    
    // Check WASD keys
    if (wasdKeys.A.isDown) moveLeft = true
    if (wasdKeys.D.isDown) moveRight = true
    if (wasdKeys.W.isDown || wasdKeys.SPACE.isDown) jump = true
    
    // Apply horizontal movement
    if (moveLeft) {
      this.sprite.setVelocityX(-this.speed)
      this.lastDirection = -1
      this.sprite.setTint(0x0044AA) // Darker blue when moving
    } else if (moveRight) {
      this.sprite.setVelocityX(this.speed)
      this.lastDirection = 1
      this.sprite.setTint(0x0044AA) // Darker blue when moving
    } else {
      this.sprite.setVelocityX(0)
      this.sprite.clearTint() // Normal color when idle
    }
    
    // Jumping
    if (jump && this.isGrounded) {
      this.sprite.setVelocityY(-this.jumpPower)
      
      // Jump effect
      this.sprite.setTint(0x00AAFF) // Light blue when jumping
      this.scene.time.delayedCall(200, () => {
        if (this.sprite) {
          this.sprite.clearTint()
        }
      })
    }
    
    // Flip sprite based on direction
    if (this.lastDirection === -1) {
      this.sprite.setFlipX(true)
    } else {
      this.sprite.setFlipX(false)
    }
    
    // Update idle animation
    if (this.sprite.body.velocity.x === 0 && this.isGrounded) {
      if (this.idleTween.paused) {
        this.idleTween.resume()
      }
    } else {
      if (!this.idleTween.paused) {
        this.idleTween.pause()
        this.sprite.setScale(1, 1)
      }
    }
  }

  destroy() {
    if (this.idleTween) {
      this.idleTween.remove()
    }
    if (this.sprite) {
      this.sprite.destroy()
    }
  }
}
