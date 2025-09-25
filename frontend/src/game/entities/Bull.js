export default class Bull {
  constructor(scene, x, y) {
    this.scene = scene
    
    // Create bull sprite
    this.sprite = scene.physics.add.sprite(x, y, 'bull')
    this.sprite.setBounce(0.1)
    this.sprite.setCollideWorldBounds(true)
    
    // Bull properties
    this.baseSpeed = 120
    this.currentSpeed = this.baseSpeed
    this.direction = -1 // Start moving left
    this.speedIncrement = 15
    this.maxSpeed = 300
    
    // Movement bounds (ground level)
    this.minX = 50
    this.maxX = 974
    
    this.setupAnimations()
    this.startMovement()
  }

  setupAnimations() {
    // Angry bull animation - slight scale pulsing
    this.angryTween = this.scene.tweens.add({
      targets: this.sprite,
      scaleX: 1.1,
      scaleY: 0.95,
      duration: 400,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    })

    // Add a red tint to make it look more aggressive
    this.sprite.setTint(0xCC4444)
    
    // Dust cloud effect when moving
    this.dustTimer = this.scene.time.addEvent({
      delay: 200,
      callback: this.createDustEffect,
      callbackScope: this,
      loop: true
    })
  }

  startMovement() {
    // Set initial velocity
    this.sprite.setVelocityX(this.direction * this.currentSpeed)
  }

  update() {
    if (!this.sprite || !this.sprite.body) return
    
    // Check boundaries and reverse direction
    if (this.sprite.x <= this.minX && this.direction === -1) {
      this.direction = 1
      this.sprite.setVelocityX(this.direction * this.currentSpeed)
      this.sprite.setFlipX(false)
    } else if (this.sprite.x >= this.maxX && this.direction === 1) {
      this.direction = -1
      this.sprite.setVelocityX(this.direction * this.currentSpeed)
      this.sprite.setFlipX(true)
    }
    
    // Ensure bull stays at ground level
    if (this.sprite.body.touching.down) {
      this.sprite.setVelocityY(0)
    }
    
    // Add some randomness to movement
    if (Math.random() < 0.002) { // 0.2% chance per frame
      this.addRandomBurst()
    }
  }

  increaseSpeed() {
    if (this.currentSpeed < this.maxSpeed) {
      this.currentSpeed += this.speedIncrement
      this.sprite.setVelocityX(this.direction * this.currentSpeed)
      
      // Visual feedback for speed increase
      this.scene.cameras.main.shake(100, 0.01)
      
      // Flash effect
      this.sprite.setTint(0xFF0000)
      this.scene.time.delayedCall(200, () => {
        if (this.sprite) {
          this.sprite.setTint(0xCC4444)
        }
      })
      
      // Increase animation speed
      if (this.angryTween) {
        this.angryTween.timeScale = Math.min(2, 1 + (this.currentSpeed - this.baseSpeed) / 100)
      }
    }
  }

  addRandomBurst() {
    // Sudden speed burst for unpredictability
    const burstSpeed = this.currentSpeed * 1.5
    this.sprite.setVelocityX(this.direction * burstSpeed)
    
    // Return to normal speed after a short time
    this.scene.time.delayedCall(500, () => {
      if (this.sprite) {
        this.sprite.setVelocityX(this.direction * this.currentSpeed)
      }
    })
    
    // Visual effect
    this.sprite.setTint(0xFF4444)
    this.scene.time.delayedCall(300, () => {
      if (this.sprite) {
        this.sprite.setTint(0xCC4444)
      }
    })
  }

  createDustEffect() {
    if (!this.sprite || !this.sprite.body) return
    
    // Only create dust when moving and on ground
    if (Math.abs(this.sprite.body.velocity.x) > 50 && this.sprite.body.touching.down) {
      // Create simple dust particle effect
      const dustX = this.sprite.x + (this.direction === 1 ? -20 : 20)
      const dustY = this.sprite.y + 20
      
      const dust = this.scene.add.circle(dustX, dustY, 3, 0xDDDDDD, 0.6)
      
      // Animate dust particle
      this.scene.tweens.add({
        targets: dust,
        y: dustY - 10,
        alpha: 0,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 300,
        ease: 'Power2',
        onComplete: () => {
          dust.destroy()
        }
      })
    }
  }

  destroy() {
    if (this.angryTween) {
      this.angryTween.remove()
    }
    if (this.dustTimer) {
      this.dustTimer.remove()
    }
    if (this.sprite) {
      this.sprite.destroy()
    }
  }
}
