const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0].value;
        const name = profile.displayName;
        const profilePicture = profile.photos?.[0]?.value;

        if (!email) {
          return done(new Error("Google account email not available"), null);
        }

        // 1. Find user using Google ID
        let user = await User.findOne({ googleId });

        if (user) {
          return done(null, user);
        }

        // 2. Check if email already exists
        user = await User.findOne({ email });

        if (user) {
          user.googleId = googleId;
          user.profilePicture = profilePicture;

          await user.save();

          return done(null, user);
        }

        // 3. Create new Google user
        user = await User.create({
          name,
          email,
          googleId,
          profilePicture,
        });


        return done(null, profile);
        
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

module.exports = passport;
