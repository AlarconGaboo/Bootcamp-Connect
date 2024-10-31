module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define('Bootcamp', {
    title: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: { notEmpty: { msg: "El campo nombre (title) es requerido" } } 
    },
    cue: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: "Debes introducir un número entero" },
        min: { args: 5, msg: "El número de CUE debe ser al menos 5" },
        max: { args: 20, msg: "El número de CUE no puede ser mayor de 20" },
        notEmpty: { msg: "Número de CUE es requerido" }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: "Se debe introducir una descripción" } }
    }
  });

  Bootcamp.associate = models => {
    Bootcamp.belongsToMany(models.User, {
      through: "UserBootcamp",
      as: "users",
      foreignKey: "bootcamp_id",
    });
  };

  return Bootcamp;
};
