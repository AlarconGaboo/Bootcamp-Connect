const express = require("express");
const app = express();
const db = require("./app/models");

app.use(express.json());

// Importar rutas
require("./app/routes/user.routes")(app);
require("./app/routes/bootcamp.routes")(app);

const PORT = process.env.PORT || 8080;

// Cambiar `{ force: true }` a `{ force: false }` para mantener los datos en la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log("La base de datos ha sido sincronizada.");

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
