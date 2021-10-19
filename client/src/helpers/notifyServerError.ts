// types
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/models/common';

const notifyServerError = (
  message: string,
  error: AxiosError<ErrorResponse>
) => {
  console.log(message + ' error from axios 👉', error?.message);
  return error?.response;
};

export default notifyServerError;
