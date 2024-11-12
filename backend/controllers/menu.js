const Menu = require('../models/menu')
// /menus implementing this logic 
async function menu(req,res){
    const pizzas = await Menu.find()
    return res.render("menus", {pizzas: pizzas})
}  
module.exports= {menu}

