const mongoose = require("mongoose");
const Category = require("../models/category");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const createActivityLog = require("../utils/createActivityLog");

// Membuat Category
exports.createCategory = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return next(new AppError("Category name is required", 400));
  }

  const category = await Category.create({
    name: name.trim(),
    description,
    user: req.user._id
  });

  // Mencatat aktivitas pembuatan Category
  await createActivityLog({
    user: req.user._id,
    action: "create",
    targetType: "Category",
    targetId: category._id,
    details: `Membuat Category: ${category.name}`
  });

  res.status(201).json({
    status: "success",
    data: { category }
  });
});

// Mengambil semua Category milik pengguna
exports.getCategories = catchAsync(async (req, res) => {
  const categories = await Category.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: { categories }
  });
});

// Mengambil satu Category milik pengguna
exports.getCategory = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid Category ID", 400));
  }

  const category = await Category.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { category }
  });
});

// Memperbarui Category
exports.updateCategory = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid Category ID", 400));
  }

  const updates = {};

  if (req.body.name !== undefined) {
    if (typeof req.body.name !== "string" || !req.body.name.trim()) {
      return next(new AppError("Category name cannot be empty", 400));
    }

    updates.name = req.body.name.trim();
  }

  if (req.body.description !== undefined) {
    updates.description = req.body.description;
  }

  if (Object.keys(updates).length === 0) {
    return next(new AppError("No valid fields provided for update", 400));
  }

  const category = await Category.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    updates,
    { returnDocument: "after", runValidators: true }
  );

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  // Mencatat aktivitas pembaruan Category
  await createActivityLog({
    user: req.user._id,
    action: "update",
    targetType: "Category",
    targetId: category._id,
    details: `Memperbarui Category: ${category.name}`
  });

  res.status(200).json({
    status: "success",
    data: { category }
  });
});

// Menghapus Category
exports.deleteCategory = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid Category ID", 400));
  }

  const category = await Category.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  // Mencatat aktivitas penghapusan Category
  await createActivityLog({
    user: req.user._id,
    action: "delete",
    targetType: "Category",
    targetId: category._id,
    details: `Menghapus Category: ${category.name}`
  });

  res.status(204).send();
});