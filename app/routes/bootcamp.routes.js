const { verifyToken } = require("../middleware/auth"); // Cambiar la importación
const controller = require("../controllers/bootcamp.controller");

module.exports = function (app) {
  app.post("/api/bootcamp", [verifyToken], controller.createBootcamp);
  app.post("/api/bootcamp/adduser", [verifyToken], controller.addUserToBootcamp);
  app.get("/api/bootcamp/:id", [verifyToken], controller.getBootcampById);
  app.get("/api/bootcamp", controller.getAllBootcamps);

  // Endpoint para listar bootcamps con usuarios
  app.get("/api/bootcamp/with-users", [verifyToken], controller.getBootcampsWithUsers);
};
