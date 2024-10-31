const db = require("../models");
const User = db.User;
const Bootcamp = db.Bootcamp;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

// Registro de usuario
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: "Este correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, password: hashedPassword });
    res.status(201).send({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Inicio de sesión
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).send({ message: "Usuario no encontrado" });

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(401).send({ accessToken: null, message: "Contraseña inválida" });

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
    res.status(200).send({ id: user.id, email: user.email, accessToken: token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Obtener todos los usuarios con sus bootcamps
exports.getAllUsersWithBootcamps = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title", "description"],
        through: { attributes: [] }
      }]
    });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error al obtener usuarios con bootcamps" });
  }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send({ message: "Usuario no encontrado" });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Actualizar usuario por ID
exports.updateUserById = (req, res) => {
  User.update(req.body, { where: { id: req.params.id } })
    .then(num => (num == 1 ? res.send({ message: "Usuario actualizado exitosamente." }) : res.send({ message: "Usuario no encontrado." })))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Eliminar usuario por ID
exports.deleteUserById = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(num => (num == 1 ? res.send({ message: "Usuario eliminado exitosamente." }) : res.send({ message: "Usuario no encontrado." }))
    .catch(err => res.status(500).send({ message: err.message })));
};
