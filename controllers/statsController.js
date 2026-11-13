const Todo = require("../models/Todo");
const catchAsync = require("../utils/catchAsync");

// Mengambil statistik seluruh Todo
exports.getTodoStats = catchAsync(async (req, res) => {
  const stats = await Todo.aggregate([
    {
      $group: {
        _id: "$status",
        total: { $sum: 1 }
      }
    }
  ]);

  const summary = {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  };

  stats.forEach((item) => {
    summary.total += item.total;

    if (item._id === "pending") {
      summary.pending = item.total;
    } else if (item._id === "in progress") {
      summary.inProgress = item.total;
    } else if (item._id === "completed") {
      summary.completed = item.total;
    }
  });

  res.status(200).json({
    status: "success",
    data: { summary }
  });
});