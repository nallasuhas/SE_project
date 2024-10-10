const {postRegister} = require('../controllers/AuthControllers')
const express = require('express');
const router = express.Router()

router.post('/register', postRegister)
router.post('/test', (req, res) => res.send('test')
)

module.exports = router