const path = require("path");

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: process.env.NODE_ENV !== "production", 
  },
  pwa: {
    name: "SwerveUI"
  },

  chainWebpack: config => {
    console.log("chainwebpack");
    config.resolve.alias.set(
      "api-client$",
      path.join(__dirname, "src/services/api/http.js")
    );
  }
};
