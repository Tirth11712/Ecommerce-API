const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {   
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    PaymentAddress: { 
        type: String, 
        default: "pending" 
    },
    orderstatus: { 
        type: String, 
        default: "placed" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    } 
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);