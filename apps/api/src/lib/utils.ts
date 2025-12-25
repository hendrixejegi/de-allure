import type { Request } from 'express';

export function validateRequestBody(req: Request, keys: string[]) {
  let isValid = true;

  if (typeof req.body === 'object') {
    for (let key of keys) {
      if (key in req.body) continue;

      isValid = false;
      break;
    }
  } else {
    isValid = false;
  }

  return isValid;
}

export function validateRequestParams(req: Request, keys: string[]) {
  let isValid = true;

  if (typeof req.params === 'object') {
    for (let key of keys) {
      if (key in req.params) continue;

      isValid = false;
      break;
    }
  } else {
    isValid = false;
  }

  return isValid;
}
