import { call, put, takeLatest } from '@redux-saga/core/effects';

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
  UpdateProductPayload,
  UpdateProductResponse,
} from '@/models/products';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { productsApiClient } from '@/apis/productsApi';
import { productActions } from '../slices/productsSlice';
import { notifySagaError } from '@/helpers/notifyError';

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  reactProduct,
  buyProduct,
} = productsApiClient();

function* handleCreateProductRequest(action: PayloadAction<FormData>) {
  try {
    const response: AxiosResponse<CreateProductResponse> = yield call(
      createProduct,
      action.payload
    );

    yield put(productActions.createProductSuccess(response.data));
  } catch (error) {
    notifySagaError(productActions.createProductFailure, error);
    yield put(productActions.createProductFailure());
  }
}

function* handleGetProductsRequest(action: PayloadAction<GetProductsParams>) {
  try {
    const response: AxiosResponse<GetProductsResponse> = yield call(
      getProducts,
      action.payload
    );

    yield put(productActions.getProductsSuccess(response.data));
  } catch (error) {
    notifySagaError(productActions.getProductsFailure, error);
    yield put(productActions.getProductsFailure());
  }
}

function* handleUpdateProductRequest(
  action: PayloadAction<UpdateProductPayload>
) {
  try {
    const response: AxiosResponse<UpdateProductResponse> = yield call(
      updateProduct,
      action.payload
    );

    yield put(productActions.updateProductSuccess(response.data));
  } catch (error) {
    notifySagaError(productActions.updateProductFailure, error);
    yield put(productActions.updateProductFailure());
  }
}

function* handleDeleteProductRequest(
  action: PayloadAction<DeleteProductPayload>
) {
  try {
    const response: AxiosResponse<DeleteProductResponse> = yield call(
      deleteProduct,
      action.payload
    );

    yield put(productActions.deleteProductSuccess(response.data));
  } catch (error) {
    notifySagaError(productActions.deleteProductFailure, error);
    yield put(productActions.deleteProductFailure());
  }
}

function* handleReactProductRequest(
  action: PayloadAction<ReactProductPayload>
) {
  try {
    yield put(productActions.reactProductSuccess(action.payload));

    yield call(reactProduct, action.payload);
  } catch (error) {
    notifySagaError(productActions.reactProductFailure, error);
    yield put(productActions.reactProductFailure());
  }
}

function* handleBuyProductRequest(action: PayloadAction<BuyProductPayload>) {
  try {
    const response: AxiosResponse<BuyProductResponse> = yield call(
      buyProduct,
      action.payload
    );

    yield put(productActions.buyProductSuccess(response.data));
  } catch (error) {
    notifySagaError(productActions.buyProductFailure, error);
    yield put(productActions.buyProductFailure());
  }
}

function* productsSaga() {
  yield takeLatest(
    productActions.createProductRequest,
    handleCreateProductRequest
  );
  yield takeLatest(productActions.getProductsRequest, handleGetProductsRequest);
  yield takeLatest(
    productActions.updateProductRequest,
    handleUpdateProductRequest
  );
  yield takeLatest(
    productActions.reactProductRequest,
    handleReactProductRequest
  );
  yield takeLatest(
    productActions.deleteProductRequest,
    handleDeleteProductRequest
  );
  yield takeLatest(productActions.buyProductRequest, handleBuyProductRequest);
}

export default productsSaga;
