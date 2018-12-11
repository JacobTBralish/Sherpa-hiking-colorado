const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy(
      [
        "/api",
        "/api/upload",
        "/auth/callback",
        "/api/visited/:id",
        "/api/visited/:id",
        "/api/saveforlater/:id",
        "/api/updateuser/:id",
        "api/getpostedimages/:id"
      ],
      { target: "http://localhost:4000/" }
    )
  );
};
