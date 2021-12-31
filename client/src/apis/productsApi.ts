// types
import {
  BuyProductPayload,
  BuyProductResponse,
  CreateProductResponse,
  DeleteProductPayload,
  DeleteProductResponse,
  GetProductsParams,
  GetProductsResponse,
  ReactProductPayload,
  ReactProductResponse,
  UpdateProductPayload,
  UpdateProductResponse,
} from '@/models/products';
import { AxiosError } from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';

import { axiosClient } from './axiosClient';
import { notifyAxiosError } from '@/helpers/notifyError';
import { axiosServer } from './axiosServer';

export const productsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createProduct: async (payload: FormData) => {
      try {
        const response = await axiosInstance.post<CreateProductResponse>(
          '/products/create',
          payload
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Create product', error as AxiosError);
      }
    },

    updateProduct: async ({
      productId,
      updatePayload,
    }: UpdateProductPayload) => {
      try {
        const response = await axiosInstance.put<UpdateProductResponse>(
          '/products/' + productId,
          updatePayload
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Update product', error as AxiosError);
      }
    },

    getProducts: async (params: GetProductsParams) => {
      try {
        const response = await axiosInstance.get<GetProductsResponse>(
          '/products',
          {
            params,
          }
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get products', error as AxiosError);
      }
    },

    deleteProduct: async ({ productId }: DeleteProductPayload) => {
      try {
        const response = await axiosInstance.delete<DeleteProductResponse>(
          '/products/' + productId
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Delete product', error as AxiosError);
      }
    },

    reactProduct: async ({ isReact, productId }: ReactProductPayload) => {
      try {
        const response = await axiosInstance.post<ReactProductResponse>(
          `/products/${productId}/reactions`,
          {
            isReact,
          }
        );

        return response;
      } catch (error) {
        return notifyAxiosError('React product', error as AxiosError);
      }
    },

    buyProduct: async ({ productId }: BuyProductPayload) => {
      try {
        const response = await axiosInstance.post<BuyProductResponse>(
          `/products/${productId}/buy`
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Buy product', error as AxiosError);
      }
    },
  };
};

export const productsApiServer = (
  ctx: GetServerSidePropsContext | NextPageContext
) => {
  const axiosInstance = axiosServer(ctx);

  return {
    getProducts: async (params: GetProductsParams) => {
      try {
        const response = await axiosInstance.get<GetProductsResponse>(
          '/products',
          {
            params,
          }
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get products', error as AxiosError);
      }
    },
  };
};
