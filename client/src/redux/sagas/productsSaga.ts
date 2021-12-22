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
import { productsActions } from '../slices/productsSlice';
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

    yield put(productsActions.createProductSuccess(response.data));
  } catch (error) {
    notifySagaError(productsActions.createProductFailure, error);
    yield put(productsActions.createProductFailure());
  }
}

function* handleGetProductsRequest(action: PayloadAction<GetProductsParams>) {
  try {
    const response: AxiosResponse<GetProductsResponse> = yield call(
      getProducts,
      action.payload
    );

    yield put(productsActions.getProductsSuccess(response.data));
  } catch (error) {
    notifySagaError(productsActions.getProductsFailure, error);
    yield put(productsActions.getProductsFailure());
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

    yield put(productsActions.updateProductSuccess(response.data));
  } catch (error) {
    notifySagaError(productsActions.updateProductFailure, error);
    yield put(productsActions.updateProductFailure());
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

    yield put(productsActions.deleteProductSuccess(response.data));
  } catch (error) {
    notifySagaError(productsActions.deleteProductFailure, error);
    yield put(productsActions.deleteProductFailure());
  }
}

function* handleReactProductRequest(
  action: PayloadAction<ReactProductPayload>
) {
  try {
    yield put(productsActions.reactProductSuccess(action.payload));

    yield call(reactProduct, action.payload);
  } catch (error) {
    notifySagaError(productsActions.reactProductFailure, error);
    yield put(productsActions.reactProductFailure());
  }
}

function* handleBuyProductRequest(action: PayloadAction<BuyProductPayload>) {
  try {
    const response: AxiosResponse<BuyProductResponse> = yield call(
      buyProduct,
      action.payload
    );

    yield put(productsActions.buyProductSuccess(response.data));
  } catch (error) {
    notifySagaError(productsActions.buyProductFailure, error);
    yield put(productsActions.buyProductFailure());
  }
}

function* productsSaga() {
  yield takeLatest(
    productsActions.createProductRequest,
    handleCreateProductRequest
  );
  yield takeLatest(
    productsActions.getProductsRequest,
    handleGetProductsRequest
  );
  yield takeLatest(
    productsActions.updateProductRequest,
    handleUpdateProductRequest
  );
  yield takeLatest(
    productsActions.reactProductRequest,
    handleReactProductRequest
  );
  yield takeLatest(
    productsActions.deleteProductRequest,
    handleDeleteProductRequest
  );
  yield takeLatest(productsActions.buyProductRequest, handleBuyProductRequest);
}

export default productsSaga;
