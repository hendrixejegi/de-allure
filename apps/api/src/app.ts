import 'dotenv/config';
import express from 'express';
import productsRouter from './routers/products.router';
import errorHandler from './middlewares/error-handler';

const app = express();

const PORT = process.env.PORT;

app.use('/api/products', productsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}...`);
});
