const {postRegister, register, postLogin, login, logout} = require('../controllers/AuthControllers')
const express = require('express');
const router = express.Router()



// router.get('/', )

router.get('/register', register)
router.post('/register', postRegister)
router.get('/login', login)
router.post('/login', postLogin)
router.post('/logout', logout )

module.exports = router