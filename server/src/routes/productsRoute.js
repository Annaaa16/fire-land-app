const express = require('express');

const upload = require('../middlewares/uploadMiddleware');

const productsController = require('../controllers/productsController');

const router = express.Router();

// @route POST api/products/create
// @desc Create new product
// @access Private
router.post('/create', upload.single('file'), productsController.createProduct);

// @route GET api/products?page=...&limit=...
// @desc Get products
// @access Private
router.get('/', productsController.getProducts);

// @route PUT api/products/:productId
// @desc Update product
// @access Private
router.put(
  '/:productId',
  upload.single('file'),
  productsController.updateProduct
);

// @route DELETE api/products/:productId
// @desc Delete product
// @access Private
router.delete('/:productId', productsController.deleteProduct);

// @route POST api/products/:productId/reactions
// @desc React or unreact to a product
// @access Private
router.post('/:productId/reactions', productsController.reactProduct);

module.exports = router;
