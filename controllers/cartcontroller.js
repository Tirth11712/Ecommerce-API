const cartmodel= require("../models/cartmodel");
const productmodel=require("../models/productmodel");

const createCart=async(req,res)=>{
    try{
        const {userId,product}=req.body;
        const newCart=new cartmodel({
            userId,
            products:[{product}],
        });

        const savedCart=await newCart.save();
        res.status(201).json(savedCart);
    }catch(err){
        res.status(500).json({message:"Error creating cart",error:err.message});
    }
};

const getCartByUserId=async(req,res)=>{
    try{
        const cart=await cartmodel.findOne({userId:req.params.userId})
        .populate('products.product');  
        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }   
        res.json(cart);
    }catch(err){
        res.status(500).json({message:"Error retrieving cart",error:err.message});
    }
};

const clearCart=async (req,res)=>{
    const userId=req.params.id;
    try{
        const cart=await cartmodel.findOne({userId});

    if(!cart)
    {
        return res.status(404).json({message:"cart not found"});
    }

    cart.products=[];
    await cart.save();
    res.status(200).json({message:"cart cleared successfully"});
    }catch(error){
        console.log("error clearing cart",error);
        res.status(500).json({message:"Error clearing cart",error:error.message});
    }
};
    

module.exports={
    createCart,
    getCartByUserId,
    clearCart,
};



