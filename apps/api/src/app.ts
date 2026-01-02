import 'dotenv/config';
import express from 'express';
import productsRouter from './routers/products.router.js';
import errorHandler from './middlewares/error-handler.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.all('/api/auth/*splat', toNodeHandler(auth)); // 'splat' is a variable that matches anything after '/api/auth/...
app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/products', productsRouter);

app.get('/', (req, res) => res.send('found'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}...`);
});
