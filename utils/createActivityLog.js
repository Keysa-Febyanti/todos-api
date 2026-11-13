const ActivityLog = require("../models/ActivityLog");

// Menyimpan riwayat aktivitas pengguna
const createActivityLog = async ({
  user,
  action,
  targetType,
  targetId,
  details
}) => {
  await ActivityLog.create({
    user,
    action,
    targetType,
    targetId,
    details
  });
};

module.exports = createActivityLog;