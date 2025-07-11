# Meridia - Travel Social Media App

Meridia is a travel social media platform that allows users to share their trips and experiences through a multi-sectional mobile app. Users can discover new destinations, plan trips, and connect with fellow travelers.

## Features

### 📱 App Pages

1. **Inspire Me** - TikTok-style feed with "For You" and "Following" tabs
2. **Curate** - Personalized recommendations with budget and distance filters
3. **My Trips** - Trip planning and management hub
4. **Map** - Local experiences and attractions discovery
5. **Profile** - User profile and trip showcase

## Tech Stack

### Frontend
- **React Native** with Expo
- **React Navigation** for navigation
- **React Native Maps** for map functionality
- **Expo Location** for location services

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT** authentication
- **bcryptjs** for password hashing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/meridia-travel-app.git
   cd meridia-travel-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb meridia_db
   
   # Run the schema
   psql meridia_db < backend/database/schema.sql
   ```

4. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp backend/.env.example backend/.env
   
   # Edit backend/.env with your database credentials and other settings
   ```

5. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   # Backend: npm run backend
   # Frontend: npm start
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
