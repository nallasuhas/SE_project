const Menu = require('../models/menu')

async function indexHome(req, res){
    const pizzas = await Menu.find()
    return res.render('home', {pizzas: pizzas})
} 

module.exports = {indexHome}