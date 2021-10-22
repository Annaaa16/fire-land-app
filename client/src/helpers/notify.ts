// types
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/models/common';

export const notifyAxiosError = (
  message: string,
  error: AxiosError<ErrorResponse>
) => {
  console.log(message + ' error from axios 👉', error?.message);
  return error?.response;
};

export const notifySagaError = (message: string, error: any) => {
  console.log(message + ' error from saga 👉', error);
};
