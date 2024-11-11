const {postRegister, register, postLogin, login, logout} = require('../controllers/AuthControllers')
const express = require('express');
const { index, updateCart } = require('../controllers/CartControllers');
const {indexHome} = require('../controllers/HomeControllers.js')
const router = express.Router()

const {admin, auth, guest, delivery} = require('../controllers/Middlewares.js');
const { indexOrder, showOrders, store } = require('../controllers/customers/OrderControllers.js');
const { Store } = require('express-session');
const { indexAdmin, updateStatusAdmin } = require('../controllers/admin/AdminControllers.js');
const {menu} = require('../controllers/Menu.js')
const {getProfile, editProfile, updateProfile} = require('../controllers/ProfileControllers.js');
const { indexDelivery } = require('../controllers/admin/DeliveryControllers.js');

router.get('/', indexHome )
router.get('/menu', menu)

router.get('/register',guest, register)
router.post('/register', postRegister)
router.get('/login', guest, login)
router.post('/login', postLogin)
router.post('/logout', logout )

router.get('/profile/edit', editProfile)
router.post('/profile/edit', updateProfile)
router.get('/profile/:id', getProfile)



router.get('/cart', index)
router.post('/update-cart', updateCart )

router.post('/orders', auth, store)
router.get('/customer/orders', auth, indexOrder)
router.get('/customer/orders/:id', auth, showOrders)

router.get('/admin/orders', admin, indexAdmin)
router.post('/admin/order/status', admin, updateStatusAdmin)

router.get('/delivery/orders', delivery, indexDelivery )
router.post('/delivery/order/status', delivery, updateStatusAdmin)



module.exports = router