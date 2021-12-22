// types
import { Loadings, Pagination, PaginationParams, Product } from './common';

export interface ProductCategories {
  food: 'food';
  drinks: 'drinks';
  games: 'games';
  toys: 'toys';
  sports: 'sports';
  entertainments: 'entertainments';
  vehicles: 'vehicles';
  comics: 'comics';
  free: 'free';
}

export interface ProductsInitState extends Loadings {
  updateProduct: Product | null;
  checkoutProduct: Product | null;
  categories: {
    [key in keyof ProductCategories]: Product[];
  };
  recent: Product[];
  isOpenCreateForm: boolean;
  isOpenCheckout: boolean;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
}

export interface CreateProductPayload {
  name: string;
  price: number;
  desc: string;
  category: string;
}

export interface GetProductsParams extends PaginationParams {
  category?: keyof ProductCategories;
  order?: 'asc' | 'desc';
  sort?: 'price' | 'reactions' | 'members' | 'sold' | 'comments';
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
  category: keyof ProductCategories;
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
