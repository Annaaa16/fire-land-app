const express = require('express');

const verifyTokens = require('../middlewares/authMiddleware');
const verifyQueries = require('../middlewares/queriesMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const productsController = require('../controllers/productsController');

const router = express.Router();

// @route POST api/products/create
// @desc Create new product
// @access Private
router.post(
  '/create',
  verifyTokens,
  upload.single('file'),
  productsController.createProduct
);

// @route GET api/products?page=...&limit=...
// @desc Get products
// @access Private
router.get('/', verifyTokens, verifyQueries, productsController.getProducts);

// @route PUT api/products/:productId
// @desc Update product
// @access Private
router.put(
  '/:productId',
  verifyTokens,
  upload.single('file'),
  productsController.updateProduct
);

// @route DELETE api/products/:productId
// @desc Delete product
// @access Private
router.delete('/:productId', verifyTokens, productsController.deleteProduct);

// @route POST api/products/:productId/reactions
// @desc React or unreact to a product
// @access Private
router.post(
  '/:productId/reactions',
  verifyTokens,
  productsController.reactProduct
);

// @route POST api/products/:productId/buy
// @desc Buy the product
// @access Private
router.post('/:productId/buy', verifyTokens, productsController.buyProduct);

module.exports = router;
