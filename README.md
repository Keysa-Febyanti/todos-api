# Todos List Management API

Todos List Management API adalah RESTful API yang dikembangkan menggunakan Node.js, Express.js, dan MongoDB untuk mengelola daftar tugas pengguna. Project ini menyediakan fitur autentikasi pengguna, pengelolaan tugas dan kategori, pencatatan aktivitas, serta statistik.

## Fitur Utama

- Registrasi dan login pengguna menggunakan JWT.
- Password hashing menggunakan bcryptjs.
- Autentikasi dan otorisasi pengguna.
- CRUD (Create, Read, Update, Delete) Todos.
- CRUD Categories.
- Filtering, searching, sorting, dan pagination.
- Validasi input menggunakan express-validator.
- Activity Log untuk mencatat aktivitas pengguna.
- Statistics API dengan perlindungan API Key.
- Dokumentasi API menggunakan Swagger UI.
- Automated testing menggunakan Jest dan Supertest.

## Teknologi yang Digunakan

**Backend:**
- Node.js
- Express.js
- JavaScript (CommonJS)

**Database:**
- MongoDB
- Mongoose

**Authentication & Validation:**
- JSON Web Token (JWT)
- bcryptjs
- express-validator

**Documentation & Testing:**
- Swagger UI
- Jest
- Supertest

**Development Tools:**
- Nodemon
- npm

## Struktur Folder

todos-api/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── tests/
├── utils/
├── validators/
├── .gitignore
├── api-endpoints.md
├── database-fields.md
├── index.js
├── package-lock.json
├── package.json
├── README.md
└── test-api.http

## Persyaratan

Pastikan sudah menginstal:
- Node.js
- npm
- MongoDB Atlas atau MongoDB lokal
- Git

## Instalasi dan Konfigurasi

1. Clone repository:

```bash
git clone URL_REPOSITORY
```

2. Masuk ke folder project:

```bash
cd todos-api
```

3. Instal dependencies:

```bash
npm install
```

4. Buat file `.env` pada folder utama project dan isi konfigurasi berikut:

```env
MONGODB_URI=your_mongodb_uri
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
API_KEY=your_api_key
```

5. Jalankan server dalam mode development:

```bash
npm run dev
```

Atau jalankan dalam mode biasa:

```bash
npm start
```

Server berjalan pada:

http://localhost:3000

## Dokumentasi API

Dokumentasi API tersedia melalui 
Swagger UI. Setelah server dijalankan,
buka alamat berikut pada browser:

http://localhost:3000/api-docs

## Automated Testing

Jalankan pengujian otomatis menggunakan:

```bash
npm test
```

Pengujian menggunakan Jest dan Supertest.

## Author

Keysa Febyanti