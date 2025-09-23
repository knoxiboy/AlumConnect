const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

// Local Strategy for login
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });
        
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        
        // Validate password
        const validate = await user.matchPassword(password);
        
        if (!validate) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        
        return done(null, user, { message: 'Logged in successfully.' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with Google ID
        let user = await User.findOne({ googleId: profile.id });
        
        if (user) {
          return done(null, user);
        }
        
        // Check if user exists with email
        user = await User.findOne({ email: profile.emails[0].value });
        
        if (user) {
          // Update user with Google ID
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }
        
        // Create new user
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: 'google_auth', // Placeholder password for Google auth users
          role: 'student', // Default role for Google signup
        });
        
        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// JWT Strategy for protecting routes
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        // Find user by ID from JWT payload
        const user = await User.findById(jwtPayload.id);
        
        if (user) {
          return done(null, user);
        }
        
        return done(null, false);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user for sessions (if using sessions)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from sessions (if using sessions)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;