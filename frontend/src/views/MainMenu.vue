<template>
  <div class="main-menu">
    <div class="container">
      <div class="menu-content">
        <div class="game-title">
          <h1>Luksong Baka</h1>
          <p class="subtitle">Dodge the Bull, Survive the Challenge!</p>
        </div>
        
        <div class="menu-buttons">
          <router-link to="/game" class="btn btn-primary">
            🎮 Start Game
          </router-link>
          
          <router-link to="/high-scores" class="btn btn-secondary">
            🏆 High Scores
          </router-link>
          
          <router-link to="/credits" class="btn btn-secondary">
            👨‍💻 Credits
          </router-link>
        </div>
        
        <div class="game-instructions">
          <h3>How to Play</h3>
          <div class="instructions">
            <p>🎯 <strong>Objective:</strong> Dodge the bull for as long as possible!</p>
            <p>🕹️ <strong>Controls:</strong> Use WASD, Arrow Keys, or Spacebar to move and jump</p>
            <p>❤️ <strong>Lives:</strong> You have 3 lives - don't let the bull catch you!</p>
            <p>⭐ <strong>Scoring:</strong> Earn points for every second you survive</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Add some entrance animation
  const elements = document.querySelectorAll('.menu-content > *')
  elements.forEach((el, index) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    setTimeout(() => {
      el.style.transition = 'all 0.6s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, index * 200)
  })
})
</script>

<style scoped>
.main-menu {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.main-menu::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="90" r="2.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-100vh) rotate(360deg); }
}

.menu-content {
  text-align: center;
  z-index: 1;
  position: relative;
  max-width: 600px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.game-title h1 {
  font-size: 4rem;
  font-weight: 800;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  font-weight: 300;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.menu-buttons .btn {
  font-size: 1.1rem;
  padding: 15px 30px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.game-instructions {
  background: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.game-instructions h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.instructions {
  text-align: left;
}

.instructions p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 10px;
  font-size: 1rem;
  line-height: 1.6;
}

.instructions strong {
  color: #feca57;
}

@media (max-width: 768px) {
  .game-title h1 {
    font-size: 2.5rem;
  }
  
  .menu-content {
    margin: 20px;
    padding: 30px 20px;
  }
  
  .menu-buttons .btn {
    font-size: 1rem;
    padding: 12px 24px;
  }
}
</style>
