import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './Routes/userRouter.js'
import productRouter from './Routes/productRouter.js'
import categoryRouter from './Routes/categoryRouter.js'
import orderRouter from './Routes/orderRouter.js'
import imageRouter from './Routes/imageRouter.js'
import cartRouter from './Routes/cartRouter.js'
import cartItemRouter from './Routes/cartItemRouter.js'
import orderItemRouter from './Routes/orderItemRouter.js'

const app = express();

// middleware to serve images from a public directory
app.use(express.static('public'));

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
app.use('/api/V1/images', imageRouter)
app.use('/api/V1/carts', cartRouter)
app.use('/api/V1/cartItems', cartItemRouter)
app.use('/api/V1/orderItems', orderItemRouter)

export default app;