<template>
  <div class="game-view">
    <div class="game-container">
      <div class="game-ui">
        <div class="game-stats">
          <div class="stat-item">
            <span class="stat-label">Score:</span>
            <span class="stat-value">{{ gameStats.score }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Lives:</span>
            <span class="stat-value">
              <span v-for="n in gameStats.lives" :key="n" class="heart">❤️</span>
              <span v-for="n in (3 - gameStats.lives)" :key="'empty-' + n" class="heart empty">🤍</span>
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Time:</span>
            <span class="stat-value">{{ formatTime(gameStats.time) }}</span>
          </div>
        </div>
        
        <div class="game-controls">
          <button @click="pauseGame" class="btn btn-secondary" v-if="!gameStats.paused && gameStats.gameStarted">
            ⏸️ Pause
          </button>
          <button @click="resumeGame" class="btn btn-success" v-if="gameStats.paused">
            ▶️ Resume
          </button>
          <router-link to="/" class="btn btn-primary">
            🏠 Menu
          </router-link>
        </div>
      </div>
      
      <div id="phaser-game" ref="gameContainer"></div>
      
      <!-- Game Over Modal -->
      <div v-if="showGameOverModal" class="modal-overlay">
        <div class="modal">
          <h2>Game Over!</h2>
          <div class="final-stats">
            <p>Final Score: <strong>{{ gameStats.finalScore }}</strong></p>
            <p>Time Survived: <strong>{{ formatTime(gameStats.finalTime) }}</strong></p>
          </div>
          
          <div class="score-submission" v-if="!scoreSubmitted">
            <h3>Submit Your Score</h3>
            <input 
              v-model="playerName" 
              type="text" 
              placeholder="Enter your name"
              maxlength="50"
              @keyup.enter="submitScore"
              class="name-input"
            />
            <div class="modal-actions">
              <button @click="submitScore" :disabled="!playerName.trim() || submitting" class="btn btn-success">
                {{ submitting ? 'Submitting...' : '🏆 Submit Score' }}
              </button>
              <button @click="skipSubmission" class="btn btn-secondary">
                Skip
              </button>
            </div>
          </div>
          
          <div class="score-submitted" v-else>
            <p>✅ Score submitted successfully!</p>
            <div class="modal-actions">
              <router-link to="/high-scores" class="btn btn-primary">
                🏆 View High Scores
              </router-link>
            </div>
          </div>
          
          <div class="modal-actions">
            <button @click="restartGame" class="btn btn-primary">
              🔄 Play Again
            </button>
            <router-link to="/" class="btn btn-secondary">
              🏠 Main Menu
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '../services/api'
import { createGame } from '../game/GameManager'

const router = useRouter()
const gameContainer = ref(null)

// Game state
const gameStats = ref({
  score: 0,
  lives: 3,
  time: 0,
  paused: false,
  gameStarted: false,
  finalScore: 0,
  finalTime: 0
})

// Modal state
const showGameOverModal = ref(false)
const scoreSubmitted = ref(false)
const playerName = ref('')
const submitting = ref(false)

let game = null

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const pauseGame = () => {
  if (game && game.scene.isActive('GameScene')) {
    game.scene.pause('GameScene')
    gameStats.value.paused = true
  }
}

const resumeGame = () => {
  if (game && game.scene.isPaused('GameScene')) {
    game.scene.resume('GameScene')
    gameStats.value.paused = false
  }
}

const restartGame = () => {
  showGameOverModal.value = false
  scoreSubmitted.value = false
  playerName.value = ''
  
  if (game) {
    game.destroy(true)
  }
  
  // Reset stats
  gameStats.value = {
    score: 0,
    lives: 3,
    time: 0,
    paused: false,
    gameStarted: false,
    finalScore: 0,
    finalTime: 0
  }
  
  // Recreate game
  setTimeout(() => {
    initGame()
  }, 100)
}

const submitScore = async () => {
  if (!playerName.value.trim() || submitting.value) return
  
  submitting.value = true
  
  try {
    await apiService.submitScore(playerName.value.trim(), gameStats.value.finalScore)
    scoreSubmitted.value = true
  } catch (error) {
    console.error('Failed to submit score:', error)
    alert('Failed to submit score. Please try again.')
  } finally {
    submitting.value = false
  }
}

const skipSubmission = () => {
  scoreSubmitted.value = true
}

const initGame = () => {
  if (!gameContainer.value) return
  
  // Game event handlers
  const gameEvents = {
    updateScore: (score) => {
      gameStats.value.score = score
    },
    updateLives: (lives) => {
      gameStats.value.lives = lives
    },
    updateTime: (time) => {
      gameStats.value.time = time
    },
    gameStarted: () => {
      gameStats.value.gameStarted = true
    },
    gameOver: (finalScore, finalTime) => {
      gameStats.value.finalScore = finalScore
      gameStats.value.finalTime = finalTime
      showGameOverModal.value = true
    }
  }
  
  game = createGame(gameContainer.value, gameEvents)
}

onMounted(() => {
  initGame()
})

onUnmounted(() => {
  if (game) {
    game.destroy(true)
  }
})
</script>

<style scoped>
.game-view {
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.game-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.game-ui {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 10;
}

.game-stats {
  display: flex;
  gap: 30px;
  align-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.stat-value {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
}

.heart {
  font-size: 1.2rem;
}

.heart.empty {
  opacity: 0.3;
}

.game-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.game-controls .btn {
  padding: 8px 16px;
  font-size: 0.9rem;
}

#phaser-game {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #87CEEB;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal h2 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 800;
}

.final-stats {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
}

.final-stats p {
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.final-stats strong {
  color: #ff6b6b;
  font-weight: 700;
}

.score-submission h3 {
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.name-input {
  width: 100%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1.1rem;
  margin-bottom: 20px;
  text-align: center;
  outline: none;
  transition: border-color 0.3s ease;
}

.name-input:focus {
  border-color: #ff6b6b;
}

.score-submitted p {
  color: #00b894;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.modal-actions .btn {
  padding: 12px 24px;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .game-ui {
    flex-direction: column;
    gap: 15px;
    padding: 10px;
  }
  
  .game-stats {
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .modal {
    padding: 30px 20px;
  }
  
  .modal h2 {
    font-size: 2rem;
  }
  
  .modal-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .modal-actions .btn {
    min-width: 200px;
  }
}
</style>
