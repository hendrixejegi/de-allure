import { Router } from 'express';
import {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
  updateProduct,
} from '../controllers/products.controller.js';

const router: Router = Router();

router.route('/').post(createProduct).get(fetchAllProducts);
router.route('/:productId').get(fetchSingleProduct).patch(updateProduct);

export default router;
