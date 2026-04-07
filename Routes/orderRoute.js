const express = require('express');
const router=express.Router();

const {
    createOrder,
    getallOrders,
    getOrderById
}=require("../controllers/ordercontroller");

router.post("/",createOrder);
router.get("/",getallOrders);
router.get("/:id",getOrderById);

module.exports=router;
