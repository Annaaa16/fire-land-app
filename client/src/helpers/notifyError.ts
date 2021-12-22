// types
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/models/common';

export const notifyAxiosError = (
  message: string,
  error: AxiosError<ErrorResponse>
) => {
  console.log(message + ' error from axios 👉', error?.message);
  return error?.response;
};

export const notifySagaError = (
  action: ActionCreatorWithoutPayload<string>,
  error: any
) => {
  console.log(action.type + ' error from saga 👉', error?.message);
};

export const notifyPageError = (page: string, error: any) => {
  console.log('Error from ' + page + ' page 👉', error?.message);
};
