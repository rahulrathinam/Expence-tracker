#!/bin/bash

# Expense Tracker Setup Script
# This script sets up the development environment for the Expense Tracker application

set -e

echo "🚀 Setting up Expense Tracker Development Environment"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB."
    echo "   Visit: https://docs.mongodb.com/manual/installation/"
    echo "   Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
fi

echo "📦 Installing Backend Dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"

echo "📦 Installing Frontend Dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

echo "🔧 Setting up Environment Variables..."
cd ../backend
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Created .env file for backend"
    echo "⚠️  Please update the JWT_SECRET in backend/.env with a secure value"
else
    echo "✅ Backend .env file already exists"
fi

cd ../frontend
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Created .env file for frontend"
else
    echo "✅ Frontend .env file already exists"
fi

echo "🏗️  Building Backend..."
cd ../backend
npm run build
echo "✅ Backend built successfully"

echo "🏗️  Building Frontend..."
cd ../frontend
npm run build
echo "✅ Frontend built successfully"

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "To start the development servers:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend && npm run dev"
echo ""
echo "Or use Docker Compose:"
echo "  docker-compose up"
echo ""
echo "Access the application:"
echo "  Frontend: http://localhost:5173"
echo "  Backend API: http://localhost:5000"
echo ""
echo "📚 For more information, see the README.md file"
echo ""


