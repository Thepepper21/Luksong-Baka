<template>
  <div class="credits">
    <div class="container">
      <div class="credits-content">
        <div class="header">
          <h1>Credits</h1>
          <p class="subtitle">Meet the team behind Luksong Baka</p>
        </div>
        
        <div class="credits-grid">
          <div class="credit-card">
            <div class="avatar">🎮</div>
            <h3>Game Developer</h3>
            <p class="name">Senior Full-Stack Developer</p>
            <p class="role">Game Design & Implementation</p>
            <div class="tech-stack">
              <span class="tech">Vue.js</span>
              <span class="tech">Phaser.js</span>
              <span class="tech">Laravel</span>
            </div>
          </div>
          
          <div class="credit-card">
            <div class="avatar">🎨</div>
            <h3>UI/UX Designer</h3>
            <p class="name">Creative Director</p>
            <p class="role">Interface Design & User Experience</p>
            <div class="tech-stack">
              <span class="tech">CSS3</span>
              <span class="tech">Animation</span>
              <span class="tech">Responsive Design</span>
            </div>
          </div>
          
          <div class="credit-card">
            <div class="avatar">⚙️</div>
            <h3>Backend Engineer</h3>
            <p class="name">API Architect</p>
            <p class="role">Database & API Development</p>
            <div class="tech-stack">
              <span class="tech">Laravel</span>
              <span class="tech">MySQL</span>
              <span class="tech">Docker</span>
            </div>
          </div>
        </div>
        
        <div class="tech-info">
          <h3>Built With</h3>
          <div class="tech-list">
            <div class="tech-item">
              <strong>Frontend:</strong> Vue.js 3 (Composition API), Phaser.js 3, Vite
            </div>
            <div class="tech-item">
              <strong>Backend:</strong> Laravel 10+, SQLite/MySQL, RESTful API
            </div>
            <div class="tech-item">
              <strong>Infrastructure:</strong> Docker, Laravel Sail, pnpm
            </div>
            <div class="tech-item">
              <strong>Game Engine:</strong> Phaser.js with Arcade Physics
            </div>
          </div>
        </div>
        
        <div class="special-thanks">
          <h3>Special Thanks</h3>
          <p>To the open-source community and all the amazing developers who created the tools and libraries that made this game possible.</p>
        </div>
        
        <div class="back-button">
          <router-link to="/" class="btn btn-primary">
            ← Back to Menu
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Add entrance animation
  const cards = document.querySelectorAll('.credit-card')
  cards.forEach((card, index) => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(30px)'
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease'
      card.style.opacity = '1'
      card.style.transform = 'translateY(0)'
    }, index * 200)
  })
})
</script>

<style scoped>
.credits {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 0;
}

.credits-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  text-align: center;
  margin-bottom: 50px;
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

.credits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.credit-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.credit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.avatar {
  font-size: 3rem;
  margin-bottom: 20px;
  display: block;
}

.credit-card h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.name {
  color: #feca57;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 5px;
}

.role {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  font-style: italic;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.tech {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.tech-info, .special-thanks {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tech-info h3, .special-thanks h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.tech-list {
  display: grid;
  gap: 15px;
}

.tech-item {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
}

.tech-item strong {
  color: #feca57;
}

.special-thanks p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  font-style: italic;
}

.back-button {
  text-align: center;
  margin-top: 40px;
}

.back-button .btn {
  font-size: 1.1rem;
  padding: 15px 30px;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2.5rem;
  }
  
  .credits-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .credit-card {
    padding: 25px 20px;
  }
  
  .tech-info, .special-thanks {
    padding: 25px 20px;
  }
}
</style>
