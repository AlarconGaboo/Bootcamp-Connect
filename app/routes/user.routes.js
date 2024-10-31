const { verifyToken } = require("../middleware/auth"); // Importar verifyToken de forma correcta
const controller = require("../controllers/user.controller"); // Importar el controlador de usuario

module.exports = function(app) {
  // Rutas de autenticación
  app.post("/api/signup", controller.signup);
  app.post("/api/signin", controller.signin);

  // Rutas protegidas por token
  app.get("/api/user/:id", verifyToken, controller.getUserById);
  app.get("/api/users/bootcamps", verifyToken, controller.getAllUsersWithBootcamps);
  app.get("/api/user", verifyToken, controller.getAllUsers);
  app.put("/api/user/:id", verifyToken, controller.updateUserById);
  app.delete("/api/user/:id", verifyToken, controller.deleteUserById);
};
