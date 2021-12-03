import { call, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  CreateProductResponse,
  DeleteProductPayload,
  DeleteProductResponse,
  ReactProductPayload,
  UpdateProductPayload,
  UpdateProductResponse,
} from '@/models/products';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { productsApiClient } from '@/apis/productsApi';
import { productsActions } from '../slices/productsSlice';
import { notifySagaError } from '@/helpers/notifyError';

const { createProduct, updateProduct, deleteProduct, reactProduct } =
  productsApiClient();

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

function* productsSaga() {
  yield takeLatest(
    productsActions.createProductRequest,
    handleCreateProductRequest
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
}

export default productsSaga;
