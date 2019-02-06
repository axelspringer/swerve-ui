const path = require("path");

module.exports = {
  productionSourceMap: false,

  pwa: {
    name: "SwerveUI"
  },

  chainWebpack: config => {
    console.log("chainwebpack");
    if (process.env.NODE_ENV === "production") {
      config.resolve.alias.set(
        "api-client$",
        path.join(__dirname, "src/services/api/http.js")
      );
    } else {
      config.resolve.alias.set(
        "api-client$",
        path.join(__dirname, "src/services/api/http-mock.js")
      );
    }
  }
};
