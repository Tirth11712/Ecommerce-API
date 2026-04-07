const express=require('express');
const router=express.Router();

const {
    getAllUsers,
    registerUser,
    loginUser,
    getUserById
}=require("../controllers/usercontroller");

//endpoints
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/",getAllUsers);
router.get("/:id",getUserById);

module.exports=router;