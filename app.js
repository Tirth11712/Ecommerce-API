const express = require('express');
const userRoute=require("./Routes/userRoute");
const productRoute=require("./Routes/productRoute");
const cartRoute=require("./Routes/cartRoute");
const orderRoute=require("./Routes/orderRoute");
require('dotenv').config();

const app = express();
app.use(express.json());

const mongoose = require('mongoose');
//connect to db
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));    


//routes
app.use("/users",userRoute);
app.use("/products",productRoute);
app.use("/carts",cartRoute);
app.use("/orders",orderRoute);


//listen to server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
