#!/bin/bash

echo "🚀 Starting CryptoIntel Dashboard Development Environment"

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Create database if it doesn't exist
createdb cryptointel 2>/dev/null || echo "📊 Database 'cryptointel' already exists"

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "🔧 Setting up database..."
npx prisma generate
npx prisma migrate dev --name init

echo "🌱 Seeding database with sample data..."
npx prisma db seed 2>/dev/null || echo "ℹ️ No seed script found, skipping..."

echo "🚀 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "🎨 Starting frontend development server..."
npm start &
FRONTEND_PID=$!

echo "✅ Development environment started successfully!"
echo "📊 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
wait $FRONTEND_PID $BACKEND_PID