interface CustomErrorProps {
  success: boolean;
  statusCode: number;
  message: string;
}

class CustomError extends Error {
  success: boolean;
  statusCode: number;

  constructor({
    statusCode,
    message,
  }: {
    statusCode: number;
    message: string;
  }) {
    super();
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
  }
}

function getErrorMessage(err: any) {
  if (typeof err === 'object' && 'message' in err) {
    return err.message;
  }

  if (err instanceof CustomError) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  return null;
}

export { CustomError, getErrorMessage };
