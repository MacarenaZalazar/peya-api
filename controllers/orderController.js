const Order = require("../models/Order");

// Crear un nuevo pedido
const createOrder = async (req, res) => {
  try {
    const { user, items, total } = req.body;
    if (!user || !Array.isArray(items) || items.length === 0)
      return res
        .status(400)
        .json({ message: "faltan datos para procesar la orden" });
    const order = new Order({ userId: user, items, total });
    await order.save();
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear pedido", error });
  }
};

// Obtener historial de pedidos
const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos", error });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
