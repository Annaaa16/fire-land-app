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
import { GetServerSidePropsContext, NextPageContext } from 'next';

import { axiosClient } from './axiosClient';
import { axiosServer } from './axiosServer';

export const productsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createProduct(payload: FormData): Promise<CreateProductResponse> {
      return axiosInstance.post('/products/create', payload);
    },

    updateProduct({
      productId,
      updatePayload,
    }: UpdateProductPayload): Promise<UpdateProductResponse> {
      return axiosInstance.put('/products/' + productId, updatePayload);
    },

    getProducts(params: GetProductsParams): Promise<GetProductsResponse> {
      return axiosInstance.get('/products', {
        params,
      });
    },

    deleteProduct({
      productId,
    }: DeleteProductPayload): Promise<DeleteProductResponse> {
      return axiosInstance.delete('/products/' + productId);
    },

    reactProduct({
      isReact,
      productId,
    }: ReactProductPayload): Promise<ReactProductResponse> {
      return axiosInstance.post(`/products/${productId}/reactions`, {
        isReact,
      });
    },

    buyProduct({ productId }: BuyProductPayload): Promise<BuyProductResponse> {
      return axiosInstance.post(`/products/${productId}/buy`);
    },
  };
};

export const productsApiServer = (
  ctx: GetServerSidePropsContext | NextPageContext
) => {
  const axiosInstance = axiosServer(ctx);

  return {
    getProducts(params: GetProductsParams): Promise<GetProductsResponse> {
      return axiosInstance.get('/products', {
        params,
      });
    },
  };
};
