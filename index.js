import express from 'express';
import cors from 'cors';
import menuItemsRoute from './src/routes/menu-items.route.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import authRoutes from './src/routes/auth.route.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({limit : '50mb'}));

app.use('/api',menuItemsRoute);
app.use('/api/auth', authRoutes);

app.get('/',(req,res)=>{
    res.send('connected!!')
})

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>console.error(err))

app.listen(PORT,()=>{
    console.log(`Server started at port : ${PORT}`);
});