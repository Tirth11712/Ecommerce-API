const productmodel=require('../models/productmodel');

const getAllProducts=async(req,res)=>{
    try{
        const products=await productmodel.find();
        res.json(products);
    }catch(err){
        res.status(500).json({message:"Error retrieving products",error:err.message});
    }
};

const getProductById=async(req,res)=>{
    try{
        const product=await productmodel.findById(req.params.id);   
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.json(product);
    }catch(err){
        res.status(500).json({message:"Invalid ID format",error:err.message});
    }   
};

module.exports={
    getAllProducts,
    getProductById,
};