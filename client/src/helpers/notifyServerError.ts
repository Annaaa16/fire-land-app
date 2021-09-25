// types
import { AxiosError } from 'axios';

const notifyServerError = (error: AxiosError) => {
  return error.response
    ? error.response
    : { success: false, message: error.message };
};

export default notifyServerError;
