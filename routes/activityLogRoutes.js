const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");
const activityLogController = require("../controllers/activityLogController");

// Melindungi seluruh endpoint Activity Log
router.use(protect);

/**
 * @swagger
 * /api/activity-logs:
 *   get:
 *     summary: Get user activity logs
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activity logs retrieved successfully
 */

// Mengambil riwayat aktivitas pengguna
router.get("/", activityLogController.getActivityLogs);

module.exports = router;