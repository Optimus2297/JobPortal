const nodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GOECODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GOECODER_API_KEY,
  formatter: null,
};

const geoCoder = nodeGeocoder(options);

module.exports = geoCoder;
