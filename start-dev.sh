#!/bin/bash

echo "🎮 Starting Luksong Baka Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start Laravel backend
echo "🚀 Starting Laravel backend..."
cd backend
php artisan key:generate --force
php artisan migrate --force
php artisan serve --host=0.0.0.0 --port=8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start Vue.js frontend
echo "🎨 Starting Vue.js frontend..."
cd frontend
pnpm dev --host 0.0.0.0 --port=3000 &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Development servers started!"
echo "🎮 Game: http://localhost:3000"
echo "🔧 API: http://localhost:8000/api"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping development servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ All servers stopped."
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for processes
wait
