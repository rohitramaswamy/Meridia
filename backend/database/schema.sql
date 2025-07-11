-- Meridia Travel Social Media App Database Schema

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    trips_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Follows table (for user relationships)
CREATE TABLE follows (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    following_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id)
);

-- Trips table
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    destination VARCHAR(200) NOT NULL,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'planned', -- planned, in_progress, completed, cancelled
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trip activities table
CREATE TABLE trip_activities (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(200),
    planned_date DATE,
    estimated_cost DECIMAL(8,2),
    actual_cost DECIMAL(8,2),
    status VARCHAR(20) DEFAULT 'planned', -- planned, completed, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table (for social media content)
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    trip_id INTEGER REFERENCES trips(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    location VARCHAR(200),
    category VARCHAR(50), -- adventure, food, culture, nature, etc.
    estimated_budget DECIMAL(8,2),
    media_urls JSONB, -- Array of image/video URLs
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post likes table
CREATE TABLE post_likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

-- Post comments table
CREATE TABLE post_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Local experiences table (for Map page)
CREATE TABLE local_experiences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50), -- restaurant, attraction, activity, accommodation, etc.
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address VARCHAR(300),
    rating DECIMAL(3,2) DEFAULT 0,
    price_range VARCHAR(10), -- $, $$, $$$, $$$$
    contact_info JSONB, -- phone, email, etc.
    opening_hours JSONB, -- structured opening hours
    website VARCHAR(300),
    image_urls JSONB,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experience reviews table
CREATE TABLE experience_reviews (
    id SERIAL PRIMARY KEY,
    experience_id INTEGER REFERENCES local_experiences(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(experience_id, user_id)
);

-- Saved posts table (for bookmarking)
CREATE TABLE saved_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id)
);

-- User preferences table (for personalization)
CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    preferred_categories JSONB, -- Array of preferred travel categories
    budget_range VARCHAR(20), -- low, medium, high
    travel_style VARCHAR(50), -- adventure, luxury, budget, family, solo, etc.
    location_preferences JSONB, -- preferred regions/countries
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);
CREATE INDEX idx_trips_user ON trips(user_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_post_likes_post ON post_likes(post_id);
CREATE INDEX idx_post_likes_user ON post_likes(user_id);
CREATE INDEX idx_post_comments_post ON post_comments(post_id);
CREATE INDEX idx_local_experiences_location ON local_experiences(latitude, longitude);
CREATE INDEX idx_local_experiences_category ON local_experiences(category);
CREATE INDEX idx_experience_reviews_experience ON experience_reviews(experience_id);

-- Sample data for development
INSERT INTO users (email, password, username, full_name, bio) VALUES
('john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq/3Haa', 'johntraveler', 'John Traveler', 'Adventure seeker | 25 countries visited | Next stop: Japan 🇯🇵'),
('sarah@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq/3Haa', 'sarahexplorer', 'Sarah Explorer', 'Food lover & culture enthusiast | Documenting my culinary adventures'),
('mike@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq/3Haa', 'mikeadventure', 'Mike Adventure', 'Outdoor enthusiast | Hiking, camping, and extreme sports');

-- Sample local experiences
INSERT INTO local_experiences (title, description, category, latitude, longitude, address, rating, price_range) VALUES
('Golden Gate Bridge', 'Iconic suspension bridge and San Francisco landmark', 'attraction', 37.8199, -122.4783, 'Golden Gate Bridge, San Francisco, CA', 4.5, 'Free'),
('Fishermans Wharf', 'Popular tourist destination with shops, restaurants, and sea lions', 'attraction', 37.8080, -122.4177, 'Pier 39, San Francisco, CA', 4.2, '$$'),
('Alcatraz Island', 'Historic former federal prison on an island', 'historical', 37.8267, -122.4233, 'Alcatraz Island, San Francisco, CA', 4.7, '$$$');
