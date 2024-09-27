import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './Routes/userRouter.js'
import productRouter from './Routes/productRouter.js'
import categoryRouter from './Routes/categoryRouter.js'
import orderRouter from './Routes/orderRouter.js'

const app = express();

app.use(morgan('combined'));

app.use(json());

app.use(cors({
    origin: '*', //wildcard is not for production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// Router Middleware
app.use('/api/V1/users', userRouter)
app.use('/api/V1/products', productRouter)
app.use('/api/V1/categories', categoryRouter)
app.use('/api/V1/orders', orderRouter)

export default app;