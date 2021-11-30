// models
const Product = require('../models/productModel');
const User = require('../models/userModel');

const {
  uploadPhoto,
  deletePhoto,
  updatePhoto,
} = require('../helpers/cloudinaryPhoto');
const { CLOUDINARY } = require('../constants');
const { notifyServerError } = require('../helpers/notifyError');

const productsController = {};

const tmpId = '6190974698d3a336ff0e23bf';

productsController.createProduct = async (req, res) => {
  const { name, price, category, desc = '' } = req.body;

  let photo = req.file?.path; // Read photo path from client

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Product name is required' });
  }

  if (!photo) {
    return res
      .status(400)
      .json({ success: false, message: 'Product photo is required' });
  }

  if (!category) {
    return res
      .status(400)
      .json({ success: false, message: 'Product category is required' });
  }

  if (!price) {
    return res
      .status(400)
      .json({ success: false, message: 'Product price is required' });
  }

  const parsedPrice = Number.parseFloat(price);
  const isValidPrice = !Number.isNaN(parsedPrice);

  if (!isValidPrice) {
    return res.status(400).json({ success: false, message: 'Invalid price' });
  }

  try {
    const user = await User.findById(req.userId || tmpId).select(['-password']);

    const { uploadedPhoto, photoId } = await uploadPhoto(
      photo,
      CLOUDINARY.PRODUCTS_UPLOAD_PATH
    );

    const product = new Product({
      user: user || tmpId,
      name,
      price: parsedPrice,
      category,
      desc,
      photo: uploadedPhoto,
      photoId,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'The product has been created successfully',
      product: product.toObject(),
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

productsController.getProducts = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  // Not specify page or limit then return all posts
  if (!page || !limit) {
    return res
      .status(400)
      .json({ success: false, message: 'Page and limit params is required' });
  }

  try {
    const total = await Product.count();

    const startPos = (page - 1) * limit;
    const endPost = page * limit;

    const prevPage = startPos > 0 ? page - 1 : null;
    const nextPage = endPost < total ? page + 1 : null;

    const products = await Product.find()
      .limit(limit)
      .skip(startPos)
      .populate('user')
      .lean();

    res.status(201).json({
      success: true,
      prevPage,
      nextPage,
      total,
      products,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

productsController.updateProduct = async (req, res) => {
  const { productId } = req.params;

  let { name, price, category, desc, photo: oldPhoto, photoId } = req.body;
  let photo = req.file?.path; // Read photo path from client

  try {
    const updateCondition = { _id: productId, user: req.userId || tmpId };

    const product = await Product.findOne(updateCondition);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or user is not authorized',
      });
    }

    const { newPhoto, newPhotoId } = await updatePhoto(
      photo,
      photoId,
      CLOUDINARY.PRODUCTS_UPLOAD_PATH
    );

    const newProduct = {
      name,
      price,
      category,
      desc,
      photo: newPhoto || oldPhoto,
      photoId: newPhotoId,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      newProduct,
      { new: true }
    )
      .populate('user')
      .lean();

    res.json({
      success: true,
      message: 'Product is updated',
      product: updatedProduct,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

productsController.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res
      .status(404)
      .json({ success: false, message: 'Product ID not found' });
  }

  try {
    const deleteCondition = { _id: productId, userId: req.userId || tmpId };

    const deletedProduct = await Product.findOneAndDelete(deleteCondition);

    if (!deletedProduct) {
      return res.status(401).json({
        success: false,
        message: 'Product not found or user is not authorized',
      });
    }

    await deletePhoto(deletedProduct.photoId);

    res.json({
      success: true,
      message: 'Product is deleted!',
      productId: deletedProduct._id,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = productsController;
