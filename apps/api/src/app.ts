import 'dotenv/config';
import express from 'express';
import productsRouter from './routers/products.router.js';
import errorHandler from './middlewares/error-handler.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/products', productsRouter);

app.get('/', (req, res) => res.send('found'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}...`);
});
