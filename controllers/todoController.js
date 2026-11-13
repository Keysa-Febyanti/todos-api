const mongoose = require("mongoose");
const Todo = require("../models/Todo");
const Category = require("../models/category");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const createActivityLog = require("../utils/createActivityLog");

const allowedStatus = ["pending", "in progress", "completed"];

// Memeriksa format ID MongoDB
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Memeriksa kategori milik pengguna
const checkCategory = async (categoryId, userId, next) => {
  if (categoryId === null || categoryId === "") return true;

  if (!isValidId(categoryId)) {
    return next(new AppError("Invalid category ID", 400));
  }

  const category = await Category.findOne({
    _id: categoryId,
    user: userId
  });

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  return true;
};

// Membuat Todo
exports.createTodo = catchAsync(async (req, res, next) => {
  const { title, description, status, dueDate, category } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return next(new AppError("Todo title is required", 400));
  }

  if (status !== undefined && !allowedStatus.includes(status)) {
    return next(new AppError("Invalid Todo status", 400));
  }

  if (dueDate !== undefined && dueDate !== null && isNaN(Date.parse(dueDate))) {
    return next(new AppError("Invalid due date", 400));
  }

  if (category !== undefined) {
    const categoryCheck = await checkCategory(category, req.user._id, next);
    if (categoryCheck !== true) return;
  }

  const todo = await Todo.create({
    title: title.trim(),
    description,
    status,
    dueDate,
    category: category || null,
    user: req.user._id
  });

  // Mencatat aktivitas pembuatan Todo
  await createActivityLog({
    user: req.user._id,
    action: "create",
    targetType: "Todo",
    targetId: todo._id,
    details: `Membuat Todo: ${todo.title}`
  });

  res.status(201).json({
    status: "success",
    data: { todo }
  });
});

// Mengambil seluruh Todo milik pengguna
exports.getTodos = catchAsync(async (req, res) => {
  const {
    status,
    category,
    search,
    sort = "-createdAt",
    page = 1,
    limit = 10
  } = req.query;

  const currentPage = Number(page);
  const perPage = Number(limit);

  if (
    !Number.isInteger(currentPage) ||
    !Number.isInteger(perPage) ||
    currentPage < 1 ||
    perPage < 1 ||
    perPage > 100
  ) {
    throw new AppError("Invalid pagination parameters", 400);
  }

  const filter = { user: req.user._id };

  if (status) {
    if (!allowedStatus.includes(status)) {
      throw new AppError("Invalid Todo status", 400);
    }
    filter.status = status;
  }

  if (category) {
    if (!isValidId(category)) {
      throw new AppError("Invalid category ID", 400);
    }
    filter.category = category;
  }

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const allowedSort = ["title", "dueDate", "createdAt", "status"];
  const sortField = sort.startsWith("-") ? sort.substring(1) : sort;

  if (!allowedSort.includes(sortField)) {
    throw new AppError("Invalid sorting field", 400);
  }

  const sortOrder = sort.startsWith("-") ? -1 : 1;
  const sortOptions = { [sortField]: sortOrder };
  const skip = (currentPage - 1) * perPage;

  const total = await Todo.countDocuments(filter);

  const todos = await Todo.find(filter)
    .populate("category")
    .sort(sortOptions)
    .skip(skip)
    .limit(perPage);

  res.status(200).json({
    status: "success",
    results: todos.length,
    pagination: {
      currentPage,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage)
    },
    data: { todos }
  });
});

// Mengambil satu Todo milik pengguna
exports.getTodo = catchAsync(async (req, res, next) => {
  if (!isValidId(req.params.id)) {
    return next(new AppError("Invalid Todo ID", 400));
  }

  const todo = await Todo.findOne({
    _id: req.params.id,
    user: req.user._id
  }).populate("category");

  if (!todo) {
    return next(new AppError("Todo not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { todo }
  });
});

// Memperbarui Todo
exports.updateTodo = catchAsync(async (req, res, next) => {
  if (!isValidId(req.params.id)) {
    return next(new AppError("Invalid Todo ID", 400));
  }

  const updates = {};
  const { title, description, status, dueDate, category } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return next(new AppError("Todo title cannot be empty", 400));
    }
    updates.title = title.trim();
  }

  if (description !== undefined) {
    updates.description = description;
  }

  if (status !== undefined) {
    if (!allowedStatus.includes(status)) {
      return next(new AppError("Invalid Todo status", 400));
    }
    updates.status = status;
  }

  if (dueDate !== undefined) {
    if (dueDate !== null && isNaN(Date.parse(dueDate))) {
      return next(new AppError("Invalid due date", 400));
    }
    updates.dueDate = dueDate;
  }

  if (category !== undefined) {
    const categoryCheck = await checkCategory(category, req.user._id, next);
    if (categoryCheck !== true) return;
    updates.category = category || null;
  }

  if (Object.keys(updates).length === 0) {
    return next(new AppError("No valid fields provided for update", 400));
  }

  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    updates,
    { returnDocument: "after", runValidators: true }
  ).populate("category");

  if (!todo) {
    return next(new AppError("Todo not found", 404));
  }

  // Mencatat aktivitas pembaruan Todo
  await createActivityLog({
    user: req.user._id,
    action: "update",
    targetType: "Todo",
    targetId: todo._id,
    details: `Memperbarui Todo: ${todo.title}`
  });

  res.status(200).json({
    status: "success",
    data: { todo }
  });
});

// Menghapus Todo
exports.deleteTodo = catchAsync(async (req, res, next) => {
  if (!isValidId(req.params.id)) {
    return next(new AppError("Invalid Todo ID", 400));
  }

  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!todo) {
    return next(new AppError("Todo not found", 404));
  }

  // Mencatat aktivitas penghapusan Todo
  await createActivityLog({
    user: req.user._id,
    action: "delete",
    targetType: "Todo",
    targetId: todo._id,
    details: `Menghapus Todo: ${todo.title}`
  });

  res.status(204).send();
});