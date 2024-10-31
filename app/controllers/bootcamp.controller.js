const db = require("../models");
const Bootcamp = db.Bootcamp; // Cambio de db.bootcamps a db.Bootcamp
const User = db.User; // Cambio de db.users a db.User

// Crear un bootcamp
exports.createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;
    const bootcamp = await Bootcamp.create({ title, cue, description });
    res.status(201).send(bootcamp);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Agregar usuario a bootcamp
exports.addUserToBootcamp = async (req, res) => {
  try {
    const { userId, bootcampId } = req.body;
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    if (!bootcamp) {
      return res.status(404).send({ message: "Bootcamp no encontrado." });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    await bootcamp.addUser(user);
    res.status(200).send({ message: `Usuario con id=${userId} agregado al bootcamp con id=${bootcampId}.` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Obtener bootcamp por ID
exports.getBootcampById = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByPk(req.params.id, {
      include: [{ model: User, as: "users", attributes: ["id", "firstName", "lastName", "email"] }]
    });
    if (!bootcamp) {
      return res.status(404).send({ message: "Bootcamp no encontrado." });
    }
    res.status(200).send(bootcamp);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Obtener todos los bootcamps
exports.getAllBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll();
    res.status(200).send(bootcamps);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Obtener todos los bootcamps con usuarios
exports.getBootcampsWithUsers = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [{ model: User, as: "users", attributes: ["id", "firstName", "lastName", "email"] }]
    });
    res.status(200).send(bootcamps);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
