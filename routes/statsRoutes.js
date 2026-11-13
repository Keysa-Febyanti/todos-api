const express = require("express");
const router = express.Router();

const apiKeyAuth = require("../middleware/apiKeyAuth");
const statsController = require("../controllers/statsController");

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get Todo statistics
 *     tags: [Statistics]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Todo statistics retrieved successfully
 *       401:
 *         description: Invalid or missing API Key
 *       500:
 *         description: API Key is not configured
 */

// Melindungi endpoint statistik menggunakan API Key
router.use(apiKeyAuth);

// Mengambil statistik seluruh Todo
router.get("/", statsController.getTodoStats);

module.exports = router;