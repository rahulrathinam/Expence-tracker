# Expense Tracker - Full Stack Application

A comprehensive expense tracking application built with React frontend and Node.js backend, featuring modern UI/UX, data visualization, and authentication.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Chart.js** for data visualization
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## 📋 Features

### Core Features
- ✅ Add, edit, delete expenses
- ✅ Categorize expenses (Food, Transport, Entertainment, etc.)
- ✅ Date-based filtering
- ✅ Search functionality
- ✅ Expense analytics and charts
- ✅ User authentication and registration
- ✅ Responsive design for mobile and desktop

### Bonus Features
- 🔐 JWT-based authentication
- 📊 Interactive charts and data visualization
- 🎨 Modern, intuitive UI/UX
- 📱 Mobile-responsive design
- 🚀 Production-ready deployment configuration
- 🔍 Advanced filtering and search
- 📈 Expense trends and insights

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Start the application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
expense-tracker/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── public/
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Utility functions
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Expenses
- `GET /api/expenses` - Get all expenses (with filtering)
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats` - Get expense statistics

## 🚀 Deployment

### Frontend (Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables for API URL

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

## 📸 Screenshots

*Screenshots will be added after implementation*

## 🎨 Design Features

- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: User preference support
- **Interactive Charts**: Visual representation of expense data
- **Smooth Animations**: Enhanced user experience

## 🔧 Development

### Code Quality
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Component-based architecture
- Custom hooks for reusable logic
- Error handling and loading states

### Testing
- Unit tests for utility functions
- Integration tests for API endpoints
- Component testing with React Testing Library

## 📝 Assumptions

1. **User Authentication**: Each user has their own expense data
2. **Categories**: Predefined expense categories with ability to add custom ones
3. **Currency**: Single currency support (INR - Indian Rupees) with potential for multi-currency
4. **Data Persistence**: All data stored in MongoDB
5. **Security**: JWT tokens for session management

## 🏆 Bonus Features Implemented

- ✅ **Authentication System**: Complete user registration and login
- ✅ **Data Visualization**: Interactive charts showing expense trends
- ✅ **Advanced UI**: Modern design with animations and responsive layout
- ✅ **Deployment Ready**: Configuration for production deployment
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Mobile Optimization**: Touch-friendly interface for mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This is a full-stack implementation covering both Frontend and Backend tracks with bonus features for enhanced evaluation.
