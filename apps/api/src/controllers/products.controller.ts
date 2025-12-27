import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import type { Product } from '../../generated/prisma/client.js';
import {
  validateRequestBody,
  validateRequestParams,
} from '../lib/request-validation.js';
import { CustomError } from '../lib/error.js';
import type { ApiResponse } from '@de-allure/shared-types';

const PRODUCT_KEYS: (keyof Omit<Product, 'id'>)[] = [
  'name',
  'imageId',
  'rating',
  'sex',
  'concentration',
];
const PARAM_KEYS = ['productId'];

export async function createProduct(
  req: Request<{}, {}, Omit<Product, 'id'>>,
  res: Response<ApiResponse<Product>>
) {
  const { isValid, missing, unexpected } = validateRequestBody(
    req,
    PRODUCT_KEYS
  );

  if (!isValid) {
    const missingFields = missing.join(', ');
    const unexpectedFields = unexpected.join(', ');

    throw new CustomError({
      statusCode: 400,
      message:
        unexpectedFields.length > 0
          ? `Received unexpected fields: ${unexpectedFields}`
          : `Missing required fields: ${missingFields}`,
    });
  }

  const newProduct = await prisma.product.create({ data: req.body });

  res.status(201).json({
    success: true,
    message: 'Product added successfully',
    data: newProduct,
  });
}

export async function fetchAllProducts(
  req: Request,
  res: Response<ApiResponse<Product[]>>
) {
  const products = await prisma.product.findMany();
  const productsLength = products.length;

  res.status(200).json({
    success: true,
    message: `Showing ${productsLength} products`,
    data: products,
  });
}

export async function fetchSingleProduct(
  req: Request<{ productId: string }>,
  res: Response<ApiResponse<Product>>
) {
  const { isValid } = validateRequestParams(req, PARAM_KEYS);

  if (!isValid) {
    throw new CustomError({
      statusCode: 400,
      message: 'No product ID was not provided',
    });
  }

  const { productId } = req.params;
  const numId = Number(productId);

  if (isNaN(numId)) {
    throw new CustomError({ statusCode: 400, message: 'Invalid product ID' });
  }

  const product = await prisma.product.findFirst({
    where: { id: numId },
  });

  if (!product) {
    throw new CustomError({
      statusCode: 404,
      message: `Couldn't find a product with id: ${productId}`,
    });
  }

  res
    .status(200)
    .json({ success: true, message: `Found One product`, data: product });
}

export async function updateProduct(
  req: Request<{ productId: string }, {}, Omit<Product, 'id'>>,
  res: Response<ApiResponse<Product>>
) {
  const { isValid: validParams } = validateRequestParams(req, PARAM_KEYS);
  const { isValid: validBody, unexpected } = validateRequestBody(
    req,
    [],
    PRODUCT_KEYS
  );

  if (!validParams) {
    throw new CustomError({
      statusCode: 400,
      message: 'No product ID was not provided',
    });
  }

  if (!validBody) {
    const unexpectedFields = unexpected.join(', ');

    throw new CustomError({
      statusCode: 400,
      message:
        unexpectedFields.length > 0
          ? `Received unexpected fields: ${unexpectedFields}`
          : `No field was provided`,
    });
  }

  const { productId } = req.params;
  const numId = Number(productId);

  if (isNaN(numId)) {
    throw new CustomError({ statusCode: 400, message: 'Invalid product ID' });
  }

  const body = req.body;
  const update: Partial<Omit<Product, 'id'>> = {};

  for (const key of PRODUCT_KEYS) {
    if (key in body) {
      (update as any)[key] = body[key];
    }
  }

  const existingProduct = await prisma.product.findFirst({
    where: { id: numId },
  });

  if (!existingProduct) {
    throw new CustomError({
      statusCode: 404,
      message: `Couldn't find a product with id: ${productId}`,
    });
  }

  const product = await prisma.product.update({
    where: { id: numId },
    data: update,
  });

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
}
