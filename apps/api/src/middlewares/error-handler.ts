import type { NextFunction, Request, Response } from 'express';
import { CustomError, getErrorMessage } from '../lib/error.js';
import { type ApiResponse } from '@repo/shared-types';

function errorHandler(
  err: any,
  req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
) {
  if (res.headersSent) {
    next(err);
  }

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ success: err.success, message: err.message });
  }

  res.status(500).json({
    success: false,
    message: getErrorMessage(err) || 'Internal server error',
  });
}

export default errorHandler;
