# TaskFlow AI – Smart Productivity Dashboard

TaskFlow AI is a **production-ready full-stack SaaS web application** that helps users manage their daily tasks while leveraging AI for smart task generation and summarization. This project demonstrates enterprise-level full-stack development with secure authentication, RESTful APIs, and a modern, responsive UI that feels like a real startup product.

---

## 🎯 Core Features

### 🔐 **Authentication System**
- ✅ User registration with name, email, password validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes (dashboard only accessible after login)
- ✅ Proper error handling and validation
- ✅ Rate limiting for authentication endpoints

### 📊 **Professional Dashboard**
- ✅ Welcome message with personalized user name
- ✅ Real-time summary cards:
  - Total Tasks counter
  - Completed Tasks counter  
  - Pending Tasks counter
- ✅ Visual progress bar showing completion percentage
- ✅ Clean, modern UI with Tailwind CSS

### 🗂️ **Task Management (CRUD)**
- ✅ Create tasks with title and description
- ✅ View all personal tasks (user data isolation)
- ✅ Update tasks (mark complete/incomplete)
- ✅ Delete tasks
- ✅ Task properties: title, description, status, created timestamp
- ✅ Users only see their own data (secure implementation)

### 🧠 **AI-Powered Features**
- ✅ **Task Suggestions**: Enter a goal → AI suggests actionable tasks
- ✅ **Task Summarization**: AI analyzes and summarizes your pending tasks
- ✅ Uses Groq API for fast, intelligent responses
- ✅ Integrated seamlessly into dashboard UI

### 🎨 **UI/UX Excellence**
- ✅ Modern, clean interface with Tailwind CSS
- ✅ Fully responsive design (mobile + desktop)
- ✅ Three main pages: Login, Signup, Dashboard
- ✅ Loading states throughout the application
- ✅ Toast notifications for user feedback
- ✅ Smooth UX interactions and transitions

### ⭐ **Bonus Features**
- ✅ **Search functionality**: Search tasks by title or description
- ✅ **Filter system**: Filter by status (all, completed, pending)
- ✅ **Dark mode toggle**: Persistent dark/light theme switching
- ✅ **Logout functionality**: Secure session management
- ✅ **Animations**: Smooth transitions and hover effects

---

## 🧱 Tech Stack

### **Frontend**
- **React 19** with Vite for fast development
- **Tailwind CSS v4** for modern, responsive styling
- **React Router** for navigation
- **Axios** for API communication
- **React Hot Toast** for notifications
- **Lucide React** for beautiful icons

### **Backend**
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **express-rate-limit** for security
- **Helmet** for security headers
- **Groq SDK** for AI integration

---

## � Project Structure

```
TaskFlow AI – Smart Productivity Dashboard/
├── client/                     # React Vite frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   └── Layout.jsx     # Main layout with navigation
│   │   ├── context/           # React context
│   │   │   └── AuthContext.jsx # Authentication context
│   │   ├── pages/             # Page components
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Register.jsx   # Registration page
│   │   │   └── Dashboard.jsx  # Main dashboard
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # Entry point
│   ├── public/                # Static assets
│   ├── .env.example           # Environment variables template
│   └── package.json
├── server/                     # Node.js Express backend
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── taskController.js
│   │   │   └── aiController.js
│   │   ├── middleware/         # Custom middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   ├── validationMiddleware.js
│   │   │   └── rateLimitMiddleware.js
│   │   ├── models/            # Mongoose models
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/            # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── aiRoutes.js
│   │   └── config/
│   │       └── db.js          # Database configuration
│   ├── .env.example           # Environment variables template
│   ├── server.js              # Server entry point
│   └── package.json
└── README.md                   # This file
```

---

## 🚀 Quick Start

### 1. **Clone the Repository**
```bash
git clone <your-repo-url>
cd "TaskFlow AI – Smart Productivity Dashboard"
```

### 2. **Install Dependencies**
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. **Environment Variables**

Create a `.env` file in the `server/` directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=your_super_secret_key_here_change_this_in_production
GROQ_API_KEY=your_groq_api_key_here
```

Create a `.env` file in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

**Important**: Copy `.env.example` files as templates if needed.

### 4. **Run the Application**
```bash
# Terminal 1: Start backend server (port 5000)
cd server
npm run dev

# Terminal 2: Start frontend dev server (port 5173)
cd client
npm run dev
```

### 5. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000

---

## 🌐 Deployment Guide

### **Frontend Deployment (Vercel)**
1. Push your code to GitHub
2. Connect the repository to Vercel
3. Configure deployment settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `VITE_API_URL=https://your-backend-url.com/api`

### **Backend Deployment (Render/Railway)**
1. Connect your repository to Render or Railway
2. Configure deployment settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. Add Environment Variables:
   - `NODE_ENV=production`
   - `MONGO_URI` (from MongoDB Atlas)
   - `JWT_SECRET` (strong secret key)
   - `GROQ_API_KEY` (from Groq console)

### **Database Setup (MongoDB Atlas)**
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Configure network access (allow all IPs for development)
4. Create database user
5. Get connection string and add to `MONGO_URI`

### **AI Integration Setup (Groq)**
1. Create a free Groq account at console.groq.com
2. Get your API key
3. Add `GROQ_API_KEY` to your environment variables

---

## 🔌 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### **Task Management**
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### **AI Features**
- `POST /api/ai/suggest` - Get AI task suggestions
- `POST /api/ai/summarize` - Get AI task summary

---

## 🛡️ Security Features

- ✅ JWT-based authentication with secure token handling
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ Rate limiting to prevent abuse
- ✅ CORS configuration
- ✅ Security headers with Helmet
- ✅ User data isolation (users only see their own data)
- ✅ Environment variable protection

---

## 📸 Screenshots

*(Add actual screenshots after deployment)*

## 🔗 Live Demo

[Link to your deployed application here]

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include error messages, steps to reproduce, and environment details

---

## 🎉 Acknowledgments

- Built with modern web technologies
- AI powered by Groq
- Icons by Lucide React
- Styled with Tailwind CSS
- Database by MongoDB
