import { createSlice } from '@reduxjs/toolkit';

// next redux wrapper
import { HYDRATE } from 'next-redux-wrapper';

// types
import {
  BuyProductPayload,
  BuyProductResponse,
  CreateProductResponse,
  DeleteProductPayload,
  DeleteProductResponse,
  GetProductsParams,
  GetProductsResponse,
  ProductCategories,
  ProductsInitState,
  ReactProductPayload,
  UpdateProductPayload,
  UpdateProductResponse,
} from '@/models/products';
import { PayloadAction } from '@reduxjs/toolkit';
import { HydrateResponse, Product } from '@/models/common';

import { addLoading, removeLoading } from '@/helpers/reduxStateLoadings';

export const actions = {
  createProduct: 'createProduct',
  getProducts: 'getProducts',
  updateProduct: 'updateProduct',
  deleteProduct: 'deletePost',
  reactProduct: 'reactProduct',
  buyProduct: 'buyProduct',
};

export const productCategories: ProductCategories = {
  food: 'food',
  drinks: 'drinks',
  games: 'games',
  toys: 'toys',
  sports: 'sports',
  entertainments: 'entertainments',
  vehicles: 'vehicles',
  comics: 'comics',
  free: 'free',
};

const initialState: ProductsInitState = {
  updateProduct: null,
  checkoutProduct: null,
  recent: [],
  categories: {
    food: [],
    drinks: [],
    games: [],
    toys: [],
    sports: [],
    entertainments: [],
    vehicles: [],
    comics: [],
    free: [],
  },
  loadings: [],
  isOpenCreateForm: false,
  isOpenCheckout: false,
  prevPage: null,
  nextPage: null,
  total: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    createProductRequest: (state, action: PayloadAction<FormData>) => {
      addLoading(state, actions.createProduct);
    },
    createProductSuccess: (
      state,
      action: PayloadAction<CreateProductResponse>
    ) => {
      const { success, product } = action.payload;

      if (success) {
        state.recent.unshift(product);
        state.categories[product.category].unshift(product);

        removeLoading(state, actions.createProduct);
      }
    },
    createProductFailure: (state) => {
      removeLoading(state, actions.createProduct);
    },

    getProductsRequest: (state, action: PayloadAction<GetProductsParams>) => {
      addLoading(state, actions.getProducts);
    },
    getProductsSuccess: (state, action: PayloadAction<GetProductsResponse>) => {
      const { success, products, prevPage, nextPage, total } = action.payload;

      if (success) {
        products.forEach((product) => {
          state.categories[product.category].push(product);
        });
        state.prevPage = prevPage!;
        state.nextPage = nextPage!;
        state.total = total!;

        removeLoading(state, actions.getProducts);
      }
    },
    getProductsFailure: (state) => {
      removeLoading(state, actions.getProducts);
    },

    updateProductRequest: (
      state,
      action: PayloadAction<UpdateProductPayload>
    ) => {
      addLoading(state, actions.updateProduct);
    },
    updateProductSuccess: (
      state,
      action: PayloadAction<UpdateProductResponse>
    ) => {
      const { success, product: updatedProduct } = action.payload;

      if (success) {
        state.categories[updatedProduct.category] = state.categories[
          updatedProduct.category
        ].map((product) => {
          return product._id === updatedProduct._id ? updatedProduct : product;
        });
      }

      removeLoading(state, actions.updateProduct);
    },
    updateProductFailure: (state) => {
      removeLoading(state, actions.updateProduct);
    },

    deleteProductRequest: (
      state,
      action: PayloadAction<DeleteProductPayload>
    ) => {
      addLoading(state, actions.deleteProduct);
    },
    deleteProductSuccess: (
      state,
      action: PayloadAction<DeleteProductResponse>
    ) => {
      const { success, product } = action.payload;

      if (success) {
        const { _id, category } = product;

        state.categories[category].forEach((product, idx) => {
          if (product._id === _id) {
            state.categories[category].splice(idx, 1);
          }
        });

        state.recent.forEach((product, idx) => {
          if (product._id === _id) {
            state.recent.splice(idx, 1);
          }
        });
      }

      removeLoading(state, actions.deleteProduct);
    },
    deleteProductFailure: (state) => {
      removeLoading(state, actions.deleteProduct);
    },

    buyProductRequest: (state, action: PayloadAction<BuyProductPayload>) => {
      addLoading(state, actions.buyProduct);
    },
    buyProductSuccess: (state, action: PayloadAction<BuyProductResponse>) => {
      const { success, product: boughtProduct } = action.payload;

      if (success) {
        state.categories[boughtProduct.category] = state.categories[
          boughtProduct.category
        ].map((product) =>
          product._id === boughtProduct._id ? boughtProduct : product
        );
      }

      removeLoading(state, actions.buyProduct);
    },
    buyProductFailure: (state) => {
      removeLoading(state, actions.buyProduct);
    },

    reactProductRequest: (
      state,
      action: PayloadAction<ReactProductPayload>
    ) => {
      addLoading(state, actions.reactProduct);
    },
    reactProductSuccess: (
      state,
      action: PayloadAction<ReactProductPayload>
    ) => {
      const { isReact, currentUserId, productId, category } = action.payload;

      state.categories[category].forEach((product) => {
        if (product._id === productId) {
          if (isReact) {
            product.reactions.push(currentUserId);
          } else {
            const idx = product.reactions.indexOf(currentUserId);

            product.reactions.splice(idx, 1);
          }
        }
      });

      removeLoading(state, actions.reactProduct);
    },
    reactProductFailure: (state) => {
      removeLoading(state, actions.reactProduct);
    },

    clearProducts: (state) => {
      const categories = state.categories;

      state.recent.length = 0;
      Object.keys(categories).forEach((key) => {
        categories[key as keyof typeof state.categories].length = 0;
      });
    },

    setUpdateProduct: (state, action: PayloadAction<Product | null>) => {
      state.updateProduct = action.payload;
    },

    setCheckoutProduct: (state, action: PayloadAction<Product | null>) => {
      state.checkoutProduct = action.payload;
    },

    setIsOpenCreateForm: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateForm = action.payload;
    },

    setIsOpenCheckout: (state, action: PayloadAction<boolean>) => {
      state.isOpenCheckout = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<HydrateResponse>) => {
      return { ...state, ...action.payload.products };
    },
  },
});

export const productActions = productsSlice.actions;

export default productsSlice.reducer;
