const express = require("express");
const categoryController = require("../controllers/categoryController");
const protect = require("../middleware/protect");
const validate = require("../validators/validate");

const {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator
} = require("../validators/categoryValidator");

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management endpoints
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories belonging to the logged-in user
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Belajar
 *               description:
 *                 type: string
 *                 example: Kategori untuk kegiatan belajar
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Category name is required
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get one category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       400:
 *         description: Invalid Category ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *   patch:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Belajar dan Tugas
 *               description:
 *                 type: string
 *                 example: Kategori untuk tugas sekolah
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid category data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       400:
 *         description: Invalid Category ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */

router
  .route("/")
  .get(categoryController.getCategories)
  .post(
    createCategoryValidator,
    validate,
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(categoryIdValidator, validate, categoryController.getCategory)
  .patch(updateCategoryValidator, validate, categoryController.updateCategory)
  .delete(categoryIdValidator, validate, categoryController.deleteCategory);

module.exports = router;