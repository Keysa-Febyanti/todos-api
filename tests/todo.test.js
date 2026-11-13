const request = require("supertest");

// Mengganti middleware autentikasi dengan pengguna tiruan
jest.mock("../middleware/protect", () => {
  return (req, res, next) => {
    req.user = {
      _id: "507f1f77bcf86cd799439011",
      role: "user"
    };
    next();
  };
});

const app = require("../index");

describe("Todo API - Automated Testing", () => {
  // Menguji pembuatan Todo tanpa judul
  test("POST /api/todos tanpa judul harus ditolak", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({
        description: "Belajar Node.js"
      });

    expect(response.statusCode).toBe(400);
  });

  // Menguji pembuatan Todo dengan status tidak valid
  test("POST /api/todos dengan status tidak valid harus ditolak", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({
        title: "Belajar Node.js",
        status: "tidak valid"
      });

    expect(response.statusCode).toBe(400);
  });

  // Menguji pembuatan Todo dengan tanggal tidak valid
  test("POST /api/todos dengan tanggal tidak valid harus ditolak", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({
        title: "Belajar Node.js",
        dueDate: "tanggal-salah"
      });

    expect(response.statusCode).toBe(400);
  });

  // Menguji filter Todo dengan status tidak valid
  test("GET /api/todos dengan status tidak valid harus ditolak", async () => {
    const response = await request(app)
      .get("/api/todos")
      .query({
        status: "tidak valid"
      });

    expect(response.statusCode).toBe(400);
  });

  // Menguji pagination dengan halaman tidak valid
  test("GET /api/todos dengan halaman tidak valid harus ditolak", async () => {
    const response = await request(app)
      .get("/api/todos")
      .query({
        page: 0
      });

    expect(response.statusCode).toBe(400);
  });

  // Menguji pagination dengan limit melebihi batas
  test("GET /api/todos dengan limit lebih dari 100 harus ditolak", async () => {
    const response = await request(app)
      .get("/api/todos")
      .query({
        limit: 101
      });

    expect(response.statusCode).toBe(400);
  });

  // Menguji pencarian dengan format sorting tidak valid
  test("GET /api/todos dengan sorting tidak valid harus ditolak", async () => {
    const response = await request(app)
      .get("/api/todos")
      .query({
        sort: "password"
      });

    expect(response.statusCode).toBe(400);
  });

  // Menguji detail Todo dengan ID tidak valid
  test("GET /api/todos dengan ID tidak valid harus ditolak", async () => {
    const response = await request(app)
      .get("/api/todos/id-salah");

    expect(response.statusCode).toBe(400);
  });
});