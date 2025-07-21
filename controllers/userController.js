const User = require("../models/User");

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    const { email, fullName, encryptedPassword } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const newUser = new User({ email, fullName, encryptedPassword });
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

// Login (validación simple)
const loginUser = async (req, res) => {
  try {
    const { email, encryptedPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (user.encryptedPassword !== encryptedPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({ message: "Login exitoso", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

// Obtener usuario por email
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

// Actualizar usuario por email
const updateUserPassword= async (req, res) => {
  try {
    const { encryptedPassword } = req.body;

    if (
      encryptedPassword == undefined ||
      encryptedPassword == null ||
      encryptedPassword.trim() == ""
    ) {
      return res.status(400).json({ message: "La contraseña es requerida" });
    }

    // Verificar si el usuario existe
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { encryptedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};


const updateUserName = async (req, res) => {
  try {
    const { fullName } = req.body;            
    if (!fullName || fullName.trim() === "") {
      return res.status(400).json({ message: "El nombre completo es requerido" });
    } 
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { fullName },
      { new: true }
    );    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar nombre de usuario", error });
  }
};

const updateUserImg = async (req, res) => {
  try {
    const { userImageUrl } = req.body;

    const updateFields = { userImageUrl };

    if (
      userImageUrl !== undefined &&
      userImageUrl !== null &&
      userImageUrl.trim() !== ""
    ) {
      updateFields.userImageUrl = userImageUrl;
    }

    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      updateFields,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserByEmail,
  updateUserName,
  updateUserPassword,
  updateUserImg,
};
