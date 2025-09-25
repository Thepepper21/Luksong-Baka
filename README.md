# Luksong Baka - 2D Arcade Game

A browser-based 2D arcade game where players dodge a bull to survive and achieve high scores.

## Features

- **Main Menu**: Start game, view credits, and high scores
- **Gameplay**: Dodge the bull using WASD/Arrow keys/Spacebar
- **Lives System**: 3 lives (hearts) per game
- **Scoring**: Points increase over time for survival
- **Leaderboard**: Global high scores with player names
- **Responsive Design**: Modern UI with smooth animations

## Tech Stack

- **Frontend**: Vue.js 3 (Composition API) + Phaser.js 3
- **Backend**: Laravel 10+ with RESTful API
- **Database**: MySQL via Laravel Sail
- **Infrastructure**: Docker with Laravel Sail
- **Game Engine**: Phaser.js with Arcade Physics

## Quick Start

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd luksong-baka
   ```

2. **Start development environment**:
   ```bash
   ./vendor/bin/sail up -d
   ```

3. **Install dependencies**:
   ```bash
   ./vendor/bin/sail composer install
   ./vendor/bin/sail npm install
   ```

4. **Setup database**:
   ```bash
   ./vendor/bin/sail artisan migrate
   ```

5. **Start frontend development server**:
   ```bash
   ./vendor/bin/sail npm run dev
   ```

6. **Access the game**:
   - Game: http://localhost:3000
   - API: http://localhost/api

## API Endpoints

- `GET /api/high-scores` - Get top scores
- `POST /api/scores` - Submit new score

## Game Controls

- **WASD** or **Arrow Keys**: Move player
- **Spacebar**: Jump
- **ESC**: Pause/Menu

## Development

The project uses Laravel Sail for containerized development. All commands should be prefixed with `./vendor/bin/sail`.

## Architecture

- **Vue.js**: Handles UI routing and screens
- **Phaser.js**: Game engine embedded in Vue component
- **Laravel**: RESTful API backend
- **Docker**: Containerized development environment

## Security

- Input validation on score submission
- Name sanitization
- Reasonable score limits
- CORS configuration for API access
