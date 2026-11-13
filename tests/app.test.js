const request = require("supertest");
const app = require("../index");

describe("Todos API - Integration Testing", () => {
  // Menguji halaman utama API
  test("GET / harus mengembalikan status 200", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Todos-List Management API is running!"
    );
  });

  // Menguji akses profil tanpa token JWT
  test("GET /api/auth/me tanpa token harus ditolak", async () => {
    const response = await request(app).get("/api/auth/me");
    expect(response.statusCode).toBe(401);
  });

  // Menguji akses statistik tanpa API Key
  test("GET /api/stats tanpa API Key harus ditolak", async () => {
    const response = await request(app).get("/api/stats");
    expect(response.statusCode).toBe(401);
  });

  // Menguji endpoint yang tidak tersedia
  test("GET endpoint tidak dikenal harus mengembalikan 404", async () => {
    const response = await request(app).get("/api/endpoint-tidak-ada");
    expect(response.statusCode).toBe(404);
  });

  // Menguji register dengan data kosong
  test("POST register dengan data kosong harus ditolak", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({});

    expect(response.statusCode).toBe(400);
  });

  // Menguji register dengan password kurang dari 8 karakter
  test("POST register dengan password pendek harus ditolak", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123"
      });

    expect(response.statusCode).toBe(400);
  });

  // Menguji login dengan data kosong
  test("POST login dengan data kosong harus ditolak", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({});

    expect(response.statusCode).toBe(400);
  });

  // Menguji akses Todo tanpa token
  test("GET /api/todos tanpa token harus ditolak", async () => {
    const response = await request(app).get("/api/todos");
    expect(response.statusCode).toBe(401);
  });

  // Menguji akses Category tanpa token
  test("GET /api/categories tanpa token harus ditolak", async () => {
    const response = await request(app).get("/api/categories");
    expect(response.statusCode).toBe(401);
  });

  // Menguji akses Activity Log tanpa token
  test("GET /api/activity-logs tanpa token harus ditolak", async () => {
    const response = await request(app).get("/api/activity-logs");
    expect(response.statusCode).toBe(401);
  });
});