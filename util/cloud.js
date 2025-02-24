require("dotenv").config();
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/qr2dn99n2",
});

module.exports = imagekit;
