import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import GameView from '../views/GameView.vue'
import Credits from '../views/Credits.vue'
import HighScores from '../views/HighScores.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: MainMenu
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/credits',
      name: 'credits',
      component: Credits
    },
    {
      path: '/high-scores',
      name: 'high-scores',
      component: HighScores
    }
  ]
})

export default router
