const express=require('express');
const router=express.Router();

const {
    createCart,
    getCartByUserId,
    clearCart
}=require("../controllers/cartcontroller");

//endpoints
router.post("/",createCart);
router.get("/:userId",getCartByUserId);
router.delete("/clear/:id",clearCart);


module.exports=router;
