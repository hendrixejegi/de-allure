import { Router } from 'express';
import {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
} from '../controllers/products.controller.js';

const router: Router = Router();

router.route('/').post(createProduct).get(fetchAllProducts);
router.route('/:productId').get(fetchSingleProduct);

export default router;
