const Order = require('../../models/orders')
const moment = require('moment')
// const stripe = require('stripe')(process.env.STRIPE_SK)

// function store(req, res){
//      // Validate request
//      const { phone, address, stripeToken, paymentType } = req.body

//      if(!phone || !address) {
//         return res.status(422).json({ message : 'All fields are required' });
//     }
//     const order = new Order({
//         customerId: req.user._id,
//         items: req.session.cart.items,
//         phone,
//         address
//     })

//     order.save()
//     .then(result => {
//      Order.populate(result, { path: 'customerId'}, (err, placedOrder) => {
         
//      })
//     })
// }

async function indexOrder(req, res) {
    const orders = await Order.find({ customerId: req.user._id },
        null,
        { sort: { 'createdAt': -1 } } )
    res.header('Cache-Control', 'no-store')
    res.render('customers/orders', { orders: orders, moment: moment })
}

async function showOrders(req, res){
    const order = await Order.findById(req.params.id)
     // Authorize user
     if(req.user._id.toString() === order.customerId.toString()) {
        return res.render('customers/singleOrder', { order })
    }
    return  res.redirect('/')
}

module.exports = {indexOrder, showOrders }