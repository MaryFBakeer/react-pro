interface ApiException {
  statusCode: number;
  message: string | string[];
}

interface HttpError {
  status: number | string;
  data?: unknown;
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isHttpError = (error: unknown): error is HttpError =>
  isObject(error) && 'status' in error;

const isApiException = (data: unknown): data is ApiException =>
  isObject(data) &&
  typeof data.statusCode === 'number' &&
  (typeof data.message === 'string' || Array.isArray(data.message));

export function getErrorMessage(error: unknown): string {
  if (isHttpError(error)) {
    if (isApiException(error.data)) {
      const { message } = error.data;
      return Array.isArray(message) ? message.join(', ') : message;
    }

    if (error.status === 'FETCH_ERROR') {
      return 'Сервер недоступен, проверьте подключение к сети';
    }
  }

  return 'Не удалось выполнить вход, попробуйте ещё раз';
}
