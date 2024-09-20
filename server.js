import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';




const app = express();

app.use(morgan('combined'));

app.use(json());

app.use(cors({
    origin: '*', //wildcard is not for production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

export default app;