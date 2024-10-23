const Order = require('../../models/orders')

function indexAdmin(req, res){
   Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders) => {
    if(req.xhr) {
        return res.json(orders)
    } else {
     return res.render('admin/orders')
    }
   })
}

function updateStatusAdmin(req, res){
  Order.updateOne({_id: req.body.orderId},  { status: req.body.status }, (err, data) => {
    if(err) {
        return res.redirect('/admin/orders')
    }
     // Emit event 
     const eventEmitter = req.app.get('eventEmitter')
     eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })
     return res.redirect('/admin/orders')
  })
}



module.exports = {indexAdmin, updateStatusAdmin}