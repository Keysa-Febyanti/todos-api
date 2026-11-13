# Database Field Design

## 1. User
- name: Nama pengguna
- email: Email untuk login
- password: Password yang sudah di-hash
- role: Peran pengguna
- createdAt: Waktu akun dibuat

## 2. Todo
- title: Judul tugas
- description: Detail tugas
- status: Status tugas (pending, in progress, completed)
- dueDate: Tenggat waktu tugas
- user: Referensi pemilik tugas
- category: Referensi kategori tugas
- createdAt: Waktu tugas dibuat

## 3. Category
- name: Nama kategori
- description: Keterangan kategori
- user: Referensi pemilik kategori
- createdAt: Waktu kategori dibuat

## 4. Activity Log
- user: Pengguna yang melakukan aktivitas
- action: Aktivitas yang dilakukan
- targetType: Jenis data yang terkait
- targetId: ID data yang terkait
- details: Informasi aktivitas
- createdAt: Waktu aktivitas dilakukan