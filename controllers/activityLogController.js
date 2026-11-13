const ActivityLog = require("../models/ActivityLog");
const catchAsync = require("../utils/catchAsync");

// Mengambil seluruh riwayat aktivitas pengguna
exports.getActivityLogs = catchAsync(async (req, res) => {
  const logs = await ActivityLog.find({
    user: req.user._id
  })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: logs.length,
    data: {
      logs
    }
  });
});