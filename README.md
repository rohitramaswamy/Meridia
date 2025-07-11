# 🌍 Meridia - Travel Social Media App

> **A modern travel social media platform that allows users to share their trips and experiences through an intuitive multi-sectional mobile app.**

Meridia connects travelers worldwide, enabling them to discover new destinations, plan trips, and share experiences with a community of fellow adventurers.

## ✨ Features

### 📱 Core App Screens

| Screen | Description | Key Features |
|--------|-------------|--------------|
| 🌟 **Inspire Me** | TikTok-style vertical feed | • "For You" algorithm-driven content<br>• "Following" feed from users you follow<br>• Swipeable travel posts and experiences |
| 🎯 **Curate** | Personalized recommendations | • AI-powered content curation<br>• Budget and distance filters<br>• Tailored to your travel preferences |
| ✈️ **My Trips** | Trip planning hub | • Plan and organize upcoming trips<br>• Track past adventures<br>• Add activities and itineraries |
| 🗺️ **Map** | Local discovery | • Find nearby experiences and attractions<br>• Google Maps integration<br>• Location-based recommendations |
| 👤 **Profile** | Personal showcase | • Display your travel portfolio<br>• Social features (followers/following)<br>• Trip statistics and achievements |

## 🛠️ Tech Stack

### Frontend
- **React Native** with Expo for cross-platform mobile development
- **React Navigation** for seamless screen transitions
- **React Native Maps** for interactive map functionality
- **Expo Location** for geolocation services
- **React Native Reanimated** for smooth animations

### Backend
- **Node.js** with Express.js for robust API development
- **PostgreSQL** for reliable data storage
- **JWT** for secure authentication
- **bcryptjs** for password encryption
- **Helmet** and rate limiting for security

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sbp826/Meridia.git
   cd Meridia
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb meridia_db

   # Run the schema to create tables
   psql meridia_db < backend/database/schema.sql
   ```

4. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp backend/.env.example backend/.env

   # Edit backend/.env with your credentials:
   # - Database connection details
   # - JWT secret key
   # - Google Maps API key
   ```

5. **Start development servers**
   ```bash
   # Start both frontend and backend simultaneously
   npm run dev

   # Or start them separately:
   npm run backend  # Backend only
   npm start        # Frontend only
   ```

## 🎯 Current Development Status

### ✅ Completed
- **Complete app structure** with 5 main screens
- **Backend API** with all essential endpoints
- **Database schema** with optimized relationships
- **Authentication system** with JWT and secure password hashing
- **Navigation system** with bottom tab navigation
- **Development environment** fully configured
- **Google Maps integration** prepared
- **Security middleware** implemented

### 🚧 In Progress
- **UI/UX customization** based on design requirements
- **Screen-specific functionality** implementation
- **API integration** with frontend components

### 📋 Next Steps
1. **Upload design screenshots** for each screen
2. **Customize UI components** to match design vision
3. **Implement screen-specific features**
4. **Add real-time functionality**
5. **Testing and optimization**

## 🔧 Development Environment
### 🔍 Verify Installation

After setup, verify everything is working:

1. **Backend Health Check**
   ```bash
   curl http://localhost:3000/health
   # Should return: {"status":"OK","message":"Meridia API is running"}
   ```

2. **Frontend Launch**
   ```bash
   npm start
   # Should open Expo DevTools and show QR code for mobile testing
   ```

3. **Database Connection**
   ```bash
   # Check if tables were created successfully
   psql meridia_db -c "\dt"
   # Should list all created tables
   ```

### Environment Variables

Create a `backend/.env` file with the following variables:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=meridia_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Google Maps (for map functionality)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Server
PORT=3000
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/follow/:userId` - Follow/unfollow user

### Trips
- `GET /api/trips/user/:userId` - Get user's trips
- `POST /api/trips` - Create new trip
- `PUT /api/trips/:tripId` - Update trip
- `DELETE /api/trips/:tripId` - Delete trip

### Posts
- `GET /api/posts/feed` - Get feed posts (For You)
- `GET /api/posts/following` - Get following feed
- `GET /api/posts/curated` - Get curated posts
- `POST /api/posts` - Create new post
- `POST /api/posts/:postId/like` - Like/unlike post

### Experiences
- `GET /api/experiences/local` - Get local experiences
- `POST /api/experiences` - Create new experience
- `GET /api/experiences/:experienceId/reviews` - Get experience reviews

## Development

### Project Structure
```
meridia-travel-app/
├── src/
│   └── screens/          # React Native screens
├── backend/
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── config/          # Configuration files
│   └── database/        # Database schema and migrations
├── assets/              # Images and other assets
└── package.json         # Frontend dependencies
```

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests (when implemented)
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@meridia-app.com or join our Discord community.
