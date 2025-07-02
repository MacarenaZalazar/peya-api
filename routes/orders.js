const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints relacionados a pedidos
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - items
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID del usuario
 *               items:
 *                 type: array
 *                 description: Lista de productos del pedido
 *                 items:
 *                   type: object
 *                   required:
 *                     - productName
 *                     - price
 *                     - quantity
 *                   properties:
 *                     productName:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /orders/{userId}:
 *   get:
 *     summary: Obtener el historial de pedidos por usuario
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       500:
 *         description: Error en el servidor
 */

// Endpoints
router.post("/", createOrder);
router.get("/:userId", getOrders);

module.exports = router;
