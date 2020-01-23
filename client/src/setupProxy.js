const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy(["/api", "/auth/facebook"], { target: "http://localhost:5060" })
  );
};
