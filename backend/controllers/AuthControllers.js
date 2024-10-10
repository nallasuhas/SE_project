const User = require('../models/users.js')
const bcrypt = require('bcrypt')
const passport = require('passport')

 async function postRegister(req, res){
    const { name, email, password }   = req.body
    if(!name || !email || !password) {
        // req.flash('error', 'All fields are required')
        // req.flash('name', name)
        // req.flash('email', email)
    //    return res.redirect('/register')
    return res.send("All fields are required")
    }

    User.exists({ email: email }, (err, result) => {
        if(result) {
        //    req.flash('error', 'Email already taken')
        //    req.flash('name', name)
        //    req.flash('email', email) 
        //    return res.redirect('/register')
        return res.send("user already exists")
        }
    })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        name,
        email,
        password: hashedPassword
    })

     user.save().then((user) => {
        res.send("register succesful")
     })
}
module.exports = {postRegister}