import express from 'express';
import db from './config.js';
import productRoutes from './routers/productRoutes.js';
import userRoutes from './routers/userRouter.js';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(3000, ()=>{
    console.log("Server is running on port 3000- test branch protection");
});