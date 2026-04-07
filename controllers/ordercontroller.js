const express = require('express');
const ordermodel = require('../models/ordermodel');

const router = express.Router();

const createOrder = async (req, res) => {
    try {
        const { userId, products } = req.body;
        const newOrder = new ordermodel({
            userId,
            products,
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: "Error creating order", error: err.message });
    }
};

const getallOrders = async (req, res) => {
    try {
        const orders = await ordermodel.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving orders", error: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await ordermodel.findById(req.params.id);     
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: "Invalid ID format", error: err.message });
    }
};

module.exports = {
    createOrder,
    getallOrders,
    getOrderById,
};
