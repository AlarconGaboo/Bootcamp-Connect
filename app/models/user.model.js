module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "El Campo del nombre es requerido" } },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "El Campo del apellido es requerido" } },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: 'Formato de correo inválido' },
        notEmpty: { msg: "El correo electrónico es requerido" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [8], msg: "La contraseña debe tener al menos 8 caracteres" }
      }
    }
  });

  User.associate = models => {
    User.belongsToMany(models.Bootcamp, {
      through: "UserBootcamp",
      as: "bootcamps",
      foreignKey: "user_id",
    });
  };

  return User;
};
