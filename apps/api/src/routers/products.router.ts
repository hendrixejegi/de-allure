import { Router } from 'express';
import {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
  updateProduct,
} from '../controllers/products.controller.js';
import { multerUpload } from '../middlewares/multer-upload.js';

const router: Router = Router();

router
  .route('/')
  .post([multerUpload.single('image'), createProduct])
  .get(fetchAllProducts);

router.route('/:productId').get(fetchSingleProduct).patch(updateProduct);

export default router;
