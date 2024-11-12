import axios from "axios"
import Noty from "noty"
import { initStripe } from "./stripe"
import { initAdmin } from "./admin"
import moment from "moment"


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();

    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})







// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
        
        // Remove any previous timestamps to avoid duplicates
        let existingTime = status.querySelector('small');
        if (existingTime) {
            existingTime.remove();
        }
    })

    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if (stepCompleted) {
            status.classList.add('step-completed')
        }
        if (dataProp === order.status) {
            stepCompleted = false

            // Create a new time element for this specific status
            let time = document.createElement('small')
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)

            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }
    })
}


updateStatus(order);

initStripe();

// Socket
let socket = io()

// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}

let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')) {
    const user = 'admin' 
    initAdmin(socket, user )
    socket.emit('join', 'adminRoom')
}
let deliveryAreaPath = window.location.pathname
if(deliveryAreaPath.includes('delivery')) {
    const user = 'delivery_partner'
    initAdmin(socket, user) 
    socket.emit('join', 'deliveryRoom')
    
}



socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updatedOrder.paymentStatus = data.paymentStatus
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
})

