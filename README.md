# 🎯 JobTracker - Job Application Management System

A modern, full-stack web application built with **Laravel** and **React** to help job seekers track and manage their job applications efficiently.

![JobTracker Banner](https://via.placeholder.com/1200x400/0C0C0C/24CFA6?text=JobTracker+-+Your+Job+Search+Companion)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Current Status](#current-status)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**JobTracker** is a comprehensive job application tracking system designed to streamline the job search process. It provides a centralized platform to manage applications, track interview schedules, analyze your job search performance, and prepare for interviews.

### Why JobTracker?

- 📊 **Data-Driven Insights**: Analyze your application success rates, response times, and trends
- 🎯 **Organized Workflow**: Keep all your job applications in one place with status tracking
- 📈 **Analytics Dashboard**: Visual representation of your job search progress
- 💼 **Interview Preparation**: Built-in interview prep module with common questions
- 🔐 **Secure OAuth**: Login with Google or GitHub for quick access

---

## ✨ Features

### ✅ Completed Features

#### Authentication & Authorization
- OAuth 2.0 authentication (Google & GitHub)
- Token-based authentication with Laravel Sanctum
- Protected routes and secure API endpoints

#### Application Management
- ✅ **Create**: Add new job applications with detailed information
- ✅ **Read**: View all applications with filtering and search
- ✅ **Update**: Edit existing applications
- ✅ **Delete**: Remove applications from the system
- Application details view with comprehensive information
- Tags/skills management for each application
- Document upload support (Resume, Cover Letter)

#### Dashboard
- Overview statistics (Total applications, Interviews, Offers, Rejections)
- Recent applications list
- Upcoming interviews calendar
- Quick action buttons
- Status distribution visualization

#### Analytics Dashboard
- 📊 **6 Interactive Charts**:
  - Applications timeline (Line chart)
  - Status distribution (Donut chart)
  - Success rate by company (Bar chart)
  - Salary distribution (Horizontal bar)
  - Application sources (Pie chart)
  - Monthly volume trends (Area chart)
- KPI cards (Success rate, Response time, Conversion rate)
- Insights cards (Best days to apply, Top skills, Industry trends)
- Date range filtering
- Export functionality

#### Interview Preparation
- Common interview questions by category (Technical, Behavioral, HR)
- Sample answers and key points
- Personal answer tracking
- Confidence rating system
- Practice status tracking
- Search and filter questions

#### User Profile
- View and edit personal information
- Social links management (LinkedIn, GitHub, Portfolio)
- Skills showcase
- Activity statistics
- Avatar upload

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Laravel 10** - PHP Framework
- **Laravel Sanctum** - API authentication
- **Laravel Socialite** - OAuth integration
- **MySQL** - Database
- **RESTful API** architecture

### DevOps
- **Git** - Version control
- **Composer** - PHP dependency management
- **NPM** - Node package management

---

## 📊 Current Status

### ✅ Completed (80%)

**Frontend UI:**
- ✅ All 7+ pages designed and implemented
- ✅ Modern dark theme with accent colors
- ✅ Smooth animations and transitions
- ✅ Interactive charts and visualizations
- ⚠️ Responsive design (Desktop complete, Mobile in progress)

**Backend API:**
- ✅ OAuth authentication (Google & GitHub)
- ✅ Applications CRUD operations
- ✅ User management
- ✅ File upload handling
- ✅ Database migrations and seeders

**Integration:**
- ✅ Frontend-Backend API integration
- ✅ Token-based authentication flow
- ✅ Protected routes
- ✅ Real data display on all pages

---

### 🚧 In Progress (15%)

- ⚠️ Mobile responsiveness for remaining pages
- ⚠️ User profile data integration (90% complete)
- ⚠️ Interview prep questions database seeding
- ⚠️ File upload optimization
- ⚠️ Settings page implementation

---

### 📅 Upcoming Features (5%)

- ⏳ Email notifications for interviews
- ⏳ Resume optimizer (ATS scoring)
- ⏳ Job recommendations
- ⏳ Export data as CSV/PDF
- ⏳ Dark/Light theme toggle
- ⏳ Advanced filtering and sorting
- ⏳ Application timeline view
- ⏳ Chrome extension (Auto-save from LinkedIn/Naukri)

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x450/0C0C0C/24CFA6?text=Dashboard+Preview)

### Applications List
![Applications](https://via.placeholder.com/800x450/0C0C0C/24CFA6?text=Applications+List)

### Analytics Dashboard
![Analytics](https://via.placeholder.com/800x450/0C0C0C/24CFA6?text=Analytics+Dashboard)

### Add Application
![Add Application](https://via.placeholder.com/800x450/0C0C0C/24CFA6?text=Add+Application+Form)

---

## 🚀 Installation

### Prerequisites

- PHP >= 8.1
- Composer
- Node.js >= 18
- MySQL >= 5.7
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/jobtracker.git
cd jobtracker
```

### Step 2: Install Dependencies
```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install
```

### Step 3: Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Step 4: Configure Environment

Edit `.env` file:
```env
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=jobtracker
DB_USERNAME=root
DB_PASSWORD=your_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_secret
GITHUB_REDIRECT_URI=http://localhost:8000/auth/github/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Step 5: Database Setup
```bash
# Run migrations
php artisan migrate

# (Optional) Seed dummy data
php artisan db:seed
```

### Step 6: OAuth Setup

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `http://localhost:8000/auth/google/callback`
6. Copy Client ID & Secret to `.env`

#### GitHub OAuth:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Add callback URL: `http://localhost:8000/auth/github/callback`
4. Copy Client ID & Secret to `.env`

### Step 7: Run Application
```bash
# Terminal 1 - Laravel Backend
php artisan serve

# Terminal 2 - React Frontend
npm run dev
```

### Step 8: Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api

---

## 💻 Usage

### Authentication

1. Navigate to http://localhost:5173
2. Click "Continue with Google" or "Continue with GitHub"
3. Authorize the application
4. You'll be redirected to the dashboard

### Adding an Application

1. Go to "Applications" page
2. Click "Add Application" button
3. Fill in the job details:
   - Company name
   - Position
   - Location
   - Work type
   - Salary range
   - Status
   - Tags
4. Upload documents (optional)
5. Click "Save Application"

### Viewing Analytics

1. Navigate to "Analytics" page
2. View various charts and insights
3. Use date range filter for specific periods
4. Export data if needed

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication
All protected endpoints require Bearer token:
```
Authorization: Bearer {token}
```

### Endpoints

#### Authentication
```http
GET  /auth/google              # Redirect to Google OAuth
GET  /auth/google/callback     # Google OAuth callback
GET  /auth/github              # Redirect to GitHub OAuth
GET  /auth/github/callback     # GitHub OAuth callback
POST /logout                   # Logout user
```

#### Applications
```http
GET    /applications           # Get all applications
POST   /applications           # Create new application
GET    /applications/{id}      # Get single application
PUT    /applications/{id}      # Update application
DELETE /applications/{id}      # Delete application
```

#### User
```http
GET    /user                   # Get authenticated user
PUT    /user                   # Update user profile
```

#### Dashboard
```http
GET    /dashboard/stats        # Get dashboard statistics
```

---

## 🗺️ Roadmap

### Phase 1: Core Features (✅ Completed)
- [x] OAuth authentication
- [x] Applications CRUD
- [x] Dashboard with statistics
- [x] Analytics with charts
- [x] Interview prep module
- [x] User profile management

### Phase 2: Enhancement (🚧 In Progress)
- [ ] Complete mobile responsiveness
- [ ] Settings page
- [ ] Email notifications
- [ ] Advanced search and filters
- [ ] Export functionality (CSV/PDF)

### Phase 3: Advanced Features (📅 Planned)
- [ ] Resume optimizer with ATS scoring
- [ ] AI-powered job recommendations
- [ ] Application timeline view
- [ ] Salary insights and trends
- [ ] Interview scheduling integration
- [ ] Chrome extension for one-click save

### Phase 4: Deployment (📅 Planned)
- [ ] Production build optimization
- [ ] CI/CD pipeline setup
- [ ] Docker containerization
- [ ] Deploy to cloud (AWS/Heroku)
- [ ] Domain and SSL setup
- [ ] Performance monitoring

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Laravel](https://laravel.com/) - Backend framework
- [React](https://react.dev/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Chart library
- [Lucide Icons](https://lucide.dev/) - Icon library

---

## 📊 Project Stats

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/jobtracker)
![GitHub issues](https://img.shields.io/github/issues/yourusername/jobtracker)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/jobtracker)
![GitHub stars](https://img.shields.io/github/stars/yourusername/jobtracker?style=social)

---

<div align="center">
  <p>Made with ❤️ by Your Name</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
```

---

## 🎯 **KEY SECTIONS EXPLAINED:**

### **1. Overview:**
- Project ka clear introduction
- Why build kiya (problem solving)

### **2. Features:**
- ✅ Completed features detail mein
- Clear categories

### **3. Current Status:**
- Completed: 80%
- In Progress: 15%
- Upcoming: 5%
- **Transparent progress tracking**

### **4. Tech Stack:**
- Frontend/Backend/DevOps breakdown
- Clear technology list

### **5. Installation:**
- Step-by-step guide
- OAuth setup instructions
- Environment configuration

### **6. Roadmap:**
- 4 phases defined
- Clear checklist format
- Future plans visible

---

## 📝 **CUSTOMIZE KARO:**

connect:
```
Username → sandip2764
Name → Sandip Paria
Email → sandipadeveloper@gmail.com
