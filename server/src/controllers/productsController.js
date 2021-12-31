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
const paginate = require('../helpers/paginate');

const productsController = {};

productsController.createProduct = async (req, res) => {
  const { name, price, category, desc = '' } = req.body;
  const photo = req.file?.path; // Read photo path from client

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

  if (isNaN(price)) {
    return res
      .status(400)
      .json({ success: false, message: 'Product price is required' });
  }

  const parsedPrice = Number.parseFloat(price);
  const isValidPrice = !isNaN(parsedPrice);

  if (!isValidPrice) {
    return res.status(400).json({ success: false, message: 'Invalid price' });
  }

  try {
    const user = await User.findById(req.userId);

    const { uploadedPhoto, photoId } = await uploadPhoto(
      photo,
      CLOUDINARY.PRODUCTS_UPLOAD_PATH
    );

    const product = new Product({
      user,
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
  const { category, sort, order } = req.query;

  const categoryList = [
    'food',
    'drinks',
    'games',
    'toys',
    'sports',
    'entertainments',
    'vehicles',
    'comics',
  ];
  const sortList = ['price', 'reactions', 'members', 'sold', 'comments'];
  const orderList = ['asc', 'desc'];

  const isFilterButInvalid = (list, item) => {
    return !list.includes(item) && typeof item === 'string';
  };

  if (isFilterButInvalid(categoryList, category)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid category',
    });
  }

  if (isFilterButInvalid(sortList, sort)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid sort',
    });
  }

  if (isFilterButInvalid(orderList, order)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid order',
    });
  }

  try {
    const total = await Product.count({ $or: [{ category }] });

    const { skip, limit, nextPage, prevPage } = paginate(req, total);

    const products = await Product.find({ $or: [{ category }] })
      .limit(limit)
      .skip(skip)
      .populate('user')
      .sort({ [sort]: order })
      .lean();

    res.json({
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
  const { name, price, category, desc, photo: oldPhoto, photoId } = req.body;
  const photo = req.file?.path; // Read photo path from client

  try {
    const updateCondition = { _id: productId, user: req.userId };

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

  try {
    const deleteCondition = { _id: productId, user: req.userId };

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
      product: deletedProduct,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

productsController.reactProduct = async (req, res) => {
  const { productId } = req.params;
  const { isReact } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const reactCondition = { _id: productId, user: req.userId };
    const isReacted = product.reactions.includes(req.userId);

    if (isReact) {
      if (isReacted) {
        return res.status(400).json({
          success: false,
          message: 'Product already reacted',
        });
      }

      const reactedProduct = await Product.findOneAndUpdate(
        reactCondition,
        {
          $push: {
            reactions: req.userId,
          },
        },
        { new: true }
      );

      res.json({
        success: true,
        message: 'React to product successfully',
        product: reactedProduct,
      });
    } else {
      if (!isReacted) {
        return res.status(400).json({
          success: false,
          message: 'Product already unreacted',
        });
      }

      const unreactedProduct = await Product.findOneAndUpdate(
        reactCondition,
        {
          $pull: {
            reactions: req.userId,
          },
        },
        { new: true }
      );

      res.json({
        success: true,
        message: 'Unreact to product successfully',
        product: unreactedProduct,
      });
    }
  } catch (error) {
    notifyServerError(res, error);
  }
};

productsController.buyProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const buyCondition = { _id: productId, user: req.userId };

    const product = await Product.findOne(buyCondition);

    if (!product) {
      return res.status(401).json({
        success: false,
        message: 'Product not found or user is not authorized',
      });
    }

    let boughtUser = product.sold.find((user) => user.userId === req.userId);

    let boughtProduct = null;

    if (boughtUser) {
      boughtUser = {
        userId: req.userId,
        count: boughtUser.count + 1,
      };

      const updatedProducts = product.sold.map((user) =>
        user.userId === boughtUser.userId ? boughtUser : user
      );

      boughtProduct = await Product.findOneAndUpdate(
        buyCondition,
        {
          $set: { sold: updatedProducts },
        },
        { new: true }
      ).populate('user');
    } else {
      const newUser = {
        userId: req.userId,
        count: 1,
      };

      boughtProduct = await Product.findOneAndUpdate(
        buyCondition,
        {
          $push: { sold: newUser },
        },
        { new: true }
      ).populate('user');
    }

    res.json({
      success: true,
      message: 'Product successfully purchased!',
      product: boughtProduct,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = productsController;
