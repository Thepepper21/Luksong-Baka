import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// API service methods
export const apiService = {
  // Get high scores
  async getHighScores(limit = 10) {
    try {
      const response = await api.get(`/high-scores?limit=${limit}`)
      return response.data
    } catch (error) {
      console.error('Error fetching high scores:', error)
      throw error
    }
  },

  // Submit a new score
  async submitScore(playerName, score) {
    try {
      const response = await api.post('/scores', {
        player_name: playerName,
        score: score
      })
      return response.data
    } catch (error) {
      console.error('Error submitting score:', error)
      throw error
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await api.get('/health')
      return response.data
    } catch (error) {
      console.error('API health check failed:', error)
      throw error
    }
  }
}

export default api
