# 🎉 Website Undangan Digital

Website undangan digital modern, elegan, dan **dinamis (real-time)** yang dibuat menggunakan React dan Firebase.
Dirancang untuk memberikan pengalaman undangan yang premium dengan animasi halus dan tampilan yang responsif.

---

## ✨ Fitur Utama

- 💌 Animasi amplop (Envelope Opening)
- ⚡ Update data real-time (Firebase Firestore)
- 🛠️ Halaman Admin untuk edit konten
- ⏳ Countdown menuju hari acara
- 📍 Informasi acara & lokasi (Google Maps)
- 📅 Timeline / susunan acara
- 🎨 UI modern & elegan
- 🌙 Mode terang / gelap (Theme Toggle)
- 📱 Responsif di semua device

---

## 🚀 Teknologi yang Digunakan

- React (Vite)
- Framer Motion (animasi)
- Firebase Firestore (database)
- React Router DOM
- CSS Custom

---

## 📦 Cara Install

Clone repository:

Buka di VS Code atau Antigravity atau IDE lain

Install dependencies:

```bash
npm install
```

Jalankan project:

```bash
npm run dev
```

---

## 🔥 Setup Firebase

1. Buat project di Firebase Console
2. Aktifkan **Firestore Database**
3. Gunakan rules berikut (untuk development):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. Buat file:

```bash
src/firebase.js
```

Isi dengan config Firebase:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY_KAMU",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

---

## 🧑‍💻 Akses Admin

Masuk ke:

```
/admin
```

Login default:

```
username: admin
password: admin123
```

---

## 🔄 Cara Kerja

1. Admin mengedit data melalui halaman `/admin`
2. Data disimpan ke Firebase
3. Website otomatis update secara real-time di semua perangkat

---

## 📁 Struktur Project

```
src/
├── components/
│   ├── Admin/
│   ├── Envelope.jsx
│   ├── Hero.jsx
│   ├── Countdown.jsx
│   ├── EventInfo.jsx
│   ├── Timeline.jsx
│   ├── Map.jsx
│   └── Footer.jsx
│
├── pages/
│   ├── Home.jsx
│   └── Admin.jsx
│
├── firebase.js
├── data.js
└── App.jsx
```

---

## ⚠️ Catatan Penting

- Rules Firebase saat ini masih terbuka (untuk development)
- Untuk penggunaan publik, disarankan menambahkan sistem autentikasi (Firebase Auth)

---

## 🚀 Pengembangan Selanjutnya

- 🔐 Sistem login admin (lebih aman)
- 🧾 Multi event (banyak undangan dalam 1 sistem)
- 🖼️ Upload gambar (Firebase Storage)
- 🔗 Custom URL per undangan
- 📊 Integrasi analytics

---

## 💡 Cocok Untuk

- Undangan pernikahan
- Ulang tahun
- Acara formal
- Bisnis undangan digital

---

## 📜 Lisensi

Bebas digunakan untuk keperluan pribadi maupun komersial.

---

## 👑 Author

Dibuat oleh **Tarzz** 🚀
