import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import type { Product } from '../../generated/prisma/client.js';
import { validateRequestBody, validateRequestParams } from '../lib/utils.js';
import { CustomError } from '../lib/error.js';
import type { ApiResponse } from '@de-allure/shared-types';

export async function createProduct(
  req: Request<{}, {}, Omit<Product, 'id'>>,
  res: Response<ApiResponse<Product>>
) {
  const productKeys = ['name', 'image', 'rating', 'sex', 'concentration'];

  if (!validateRequestBody(req, productKeys)) {
    throw new CustomError({
      statusCode: 400,
      message: 'Missing required fields',
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
  const paramKeys = ['productId'];

  if (!validateRequestParams(req, paramKeys)) {
    throw new CustomError({
      statusCode: 400,
      message: 'No product ID was not provided',
    });
  }

  const { productId } = req.params;

  const product = await prisma.product.findFirst({
    where: { id: Number(productId) },
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
