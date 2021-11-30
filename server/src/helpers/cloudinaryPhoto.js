const cloudinary = require('../configs/cloudinaryConfig');

exports.uploadPhoto = async (photo, cloudinaryFolderPath) => {
  const { secure_url, public_id } = await cloudinary.uploader.upload(photo, {
    folder: cloudinaryFolderPath,
  });

  return { uploadedPhoto: secure_url, photoId: public_id };
};

exports.updatePhoto = async (photo, photoId, cloudinaryFolderPath) => {
  const isUpdate = photo && photoId;
  const isAdd = photo && !photoId;

  if (isUpdate) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(photo, {
      public_id: photoId,
      overwrite: true,
      invalidate: true,
    });

    photo = secure_url;
    photoId = public_id;
  } else if (isAdd) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(photo, {
      folder: cloudinaryFolderPath,
    });

    photo = secure_url;
    photoId = public_id;
  } else {
    photo = '';
    photoId = '';
  }

  return { newPhoto: photo, newPhotoId: photoId };
};

exports.deletePhoto = async (photoId) => {
  if (photoId) {
    await cloudinary.uploader.destroy(photoId);
  }
};
