<template>
  <div class="high-scores">
    <div class="container">
      <div class="scores-content">
        <div class="header">
          <h1>🏆 High Scores</h1>
          <p class="subtitle">Hall of Fame - Top Bull Dodgers</p>
        </div>
        
        <div class="scores-container">
          <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>Loading high scores...</p>
          </div>
          
          <div v-else-if="error" class="error">
            <p>❌ {{ error }}</p>
            <button @click="fetchHighScores" class="btn btn-secondary">
              🔄 Retry
            </button>
          </div>
          
          <div v-else-if="scores.length === 0" class="no-scores">
            <p>🎯 No high scores yet!</p>
            <p>Be the first to set a record!</p>
            <router-link to="/game" class="btn btn-primary">
              🎮 Play Now
            </router-link>
          </div>
          
          <div v-else class="scores-list">
            <div 
              v-for="(score, index) in scores" 
              :key="score.id"
              class="score-item"
              :class="{ 
                'first-place': index === 0,
                'second-place': index === 1,
                'third-place': index === 2
              }"
            >
              <div class="rank">
                <span v-if="index === 0">🥇</span>
                <span v-else-if="index === 1">🥈</span>
                <span v-else-if="index === 2">🥉</span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              
              <div class="player-info">
                <div class="player-name">{{ score.player_name }}</div>
                <div class="score-date">{{ formatDate(score.created_at) }}</div>
              </div>
              
              <div class="score-value">
                {{ score.score.toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="actions">
          <router-link to="/" class="btn btn-secondary">
            ← Back to Menu
          </router-link>
          
          <router-link to="/game" class="btn btn-primary">
            🎮 Play Game
          </router-link>
          
          <button @click="fetchHighScores" class="btn btn-success">
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from '../services/api'

const scores = ref([])
const loading = ref(true)
const error = ref(null)

const fetchHighScores = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await apiService.getHighScores(10)
    scores.value = response.data || []
  } catch (err) {
    error.value = 'Failed to load high scores. Please check your connection.'
    console.error('Error fetching high scores:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchHighScores()
  
  // Add entrance animation
  setTimeout(() => {
    const items = document.querySelectorAll('.score-item')
    items.forEach((item, index) => {
      item.style.opacity = '0'
      item.style.transform = 'translateX(-20px)'
      setTimeout(() => {
        item.style.transition = 'all 0.4s ease'
        item.style.opacity = '1'
        item.style.transform = 'translateX(0)'
      }, index * 100)
    })
  }, 500)
})
</script>

<style scoped>
.high-scores {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 0;
}

.scores-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 3rem;
  color: white;
  font-weight: 800;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
}

.scores-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.loading, .error, .no-scores {
  text-align: center;
  padding: 60px 20px;
  color: white;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error p {
  color: #ff6b6b;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.no-scores p {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.no-scores p:first-child {
  font-size: 1.5rem;
  color: #feca57;
}

.scores-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.score-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.score-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(5px);
}

.first-place {
  background: linear-gradient(45deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1));
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.second-place {
  background: linear-gradient(45deg, rgba(192, 192, 192, 0.2), rgba(192, 192, 192, 0.1));
  border: 1px solid rgba(192, 192, 192, 0.3);
}

.third-place {
  background: linear-gradient(45deg, rgba(205, 127, 50, 0.2), rgba(205, 127, 50, 0.1));
  border: 1px solid rgba(205, 127, 50, 0.3);
}

.rank {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  min-width: 60px;
  text-align: center;
}

.player-info {
  flex: 1;
  margin-left: 20px;
}

.player-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 5px;
}

.score-date {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.score-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #feca57;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.actions .btn {
  font-size: 1rem;
  padding: 12px 24px;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2.5rem;
  }
  
  .scores-container {
    padding: 20px;
  }
  
  .score-item {
    padding: 15px;
  }
  
  .player-info {
    margin-left: 15px;
  }
  
  .player-name {
    font-size: 1.1rem;
  }
  
  .score-value {
    font-size: 1.3rem;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .actions .btn {
    min-width: 200px;
  }
}
</style>
