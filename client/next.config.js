/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'image.tmdb.org', 'avatars.dicebear.com'],
  },
  swcMinify: true,
};
