// types
import { Loadings, Pagination, Product } from './common';

import { productCategories } from '@/redux/slices/productsSlice';

export interface ProductsInitState extends Loadings {
  updateProduct: Product | null;
  checkoutProduct: Product | null;
  categories: {
    [key in keyof typeof productCategories]: Product[];
  };
  recent: Product[];
  isOpenCreateForm: boolean;
  isOpenCheckout: boolean;
}

export interface CreateProductPayload {
  name: string;
  price: number;
  desc: string;
  category: string;
}

export interface UpdateProductPayload {
  productId: string;
  updatePayload: FormData;
}

export interface DeleteProductPayload {
  productId: string;
}

export interface ReactProductPayload {
  isReact: boolean;
  currentUserId: string;
  productId: string;
  category: keyof typeof productCategories;
}

export interface BuyProductPayload {
  productId: string;
}

// === Responses ===
export interface CreateProductResponse {
  message: string;
  success: boolean;
  product: Product;
}

export interface GetProductsResponse extends Pagination {
  message: string;
  success: boolean;
  products: Product[];
}

export interface UpdateProductResponse {
  message: string;
  success: boolean;
  product: Product;
}

export interface DeleteProductResponse {
  message: string;
  success: boolean;
  product: Product;
}

export interface ReactProductResponse {
  message: string;
  success: boolean;
  product: Product;
}

export interface BuyProductResponse {
  message: string;
  success: boolean;
  product: Product;
}
