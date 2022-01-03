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

import { productsApiClient } from '@/apis/productsApi';
import { productActions } from '../slices/productsSlice';

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
    const response: CreateProductResponse = yield call(
      createProduct,
      action.payload
    );

    yield put(productActions.createProductSuccess(response));
  } catch (error) {
    yield put(productActions.createProductFailure());
  }
}

function* handleGetProductsRequest(action: PayloadAction<GetProductsParams>) {
  try {
    const response: GetProductsResponse = yield call(
      getProducts,
      action.payload
    );

    yield put(productActions.getProductsSuccess(response));
  } catch (error) {
    yield put(productActions.getProductsFailure());
  }
}

function* handleUpdateProductRequest(
  action: PayloadAction<UpdateProductPayload>
) {
  try {
    const response: UpdateProductResponse = yield call(
      updateProduct,
      action.payload
    );

    yield put(productActions.updateProductSuccess(response));
  } catch (error) {
    yield put(productActions.updateProductFailure());
  }
}

function* handleDeleteProductRequest(
  action: PayloadAction<DeleteProductPayload>
) {
  try {
    const response: DeleteProductResponse = yield call(
      deleteProduct,
      action.payload
    );

    yield put(productActions.deleteProductSuccess(response));
  } catch (error) {
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
    yield put(productActions.reactProductFailure());
  }
}

function* handleBuyProductRequest(action: PayloadAction<BuyProductPayload>) {
  try {
    const response: BuyProductResponse = yield call(buyProduct, action.payload);

    yield put(productActions.buyProductSuccess(response));
  } catch (error) {
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
