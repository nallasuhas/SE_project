const bcrypt = require('bcrypt')
const User = require('../models/users.js')

const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')

    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        
        try {
            const user = await User.findOne({ email: email });
    
            
            
            if (!user) {
                // If no user is found with the given email
                return done(null, false, { message: 'No user with this email' });
            }
          
            
        
            const match = await bcrypt.compare(password, user.password);
            
            if (match) {
                // Passwords match
                return done(null, user, { message: 'Logged in successfully' });
            }
        
            // Passwords don't match
            return done(null, false, { message: 'Wrong username or password' });
        
        } catch (err) {
            // Handle any errors that occur during the database lookup or bcrypt comparison
            return done(null, false, { message: 'Something went wrong' });
        }
        
        
    }))

    passport.serializeUser((user, done) => {
    done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            done(null, user); // successful case
        } catch (err) {
            done(err); // handle error
        }
    });
    


module.exports = passport