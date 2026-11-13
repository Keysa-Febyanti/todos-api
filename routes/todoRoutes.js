const express = require("express");
const todoController = require("../controllers/todoController");
const protect = require("../middleware/protect");
const validate = require("../validators/validate");

const {
  createTodoValidator,
  updateTodoValidator,
  todoIdValidator,
  getTodosValidator
} = require("../validators/todoValidator");

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Dokumentasi pengelolaan Todo
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Menampilkan seluruh Todo milik pengguna
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in progress, completed]
 *         description: Filter berdasarkan status
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter berdasarkan ID kategori
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Cari Todo berdasarkan judul
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: -createdAt
 *         description: Urutkan berdasarkan title, dueDate, createdAt, atau status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Nomor halaman
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Jumlah data per halaman
 *     responses:
 *       200:
 *         description: Daftar Todo berhasil ditampilkan
 *       401:
 *         description: Pengguna belum terautentikasi
 *
 *   post:
 *     summary: Membuat Todo baru
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Belajar Node.js
 *               description:
 *                 type: string
 *                 example: Mempelajari Express dan MongoDB
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *                 example: pending
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo berhasil dibuat
 *       400:
 *         description: Data Todo tidak valid
 *       401:
 *         description: Pengguna belum terautentikasi
 *
 * /api/todos/{id}:
 *   get:
 *     summary: Menampilkan detail Todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Todo
 *     responses:
 *       200:
 *         description: Detail Todo berhasil ditampilkan
 *       400:
 *         description: Format ID tidak valid
 *       404:
 *         description: Todo tidak ditemukan
 *
 *   patch:
 *     summary: Memperbarui Todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todo berhasil diperbarui
 *       400:
 *         description: Data Todo tidak valid
 *       404:
 *         description: Todo tidak ditemukan
 *
 *   delete:
 *     summary: Menghapus Todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Todo
 *     responses:
 *       204:
 *         description: Todo berhasil dihapus
 *       400:
 *         description: Format ID tidak valid
 *       404:
 *         description: Todo tidak ditemukan
 */

router
  .route("/")
  .get(getTodosValidator, validate, todoController.getTodos)
  .post(createTodoValidator, validate, todoController.createTodo);

router
  .route("/:id")
  .get(todoIdValidator, validate, todoController.getTodo)
  .patch(updateTodoValidator, validate, todoController.updateTodo)
  .delete(todoIdValidator, validate, todoController.deleteTodo);

module.exports = router;