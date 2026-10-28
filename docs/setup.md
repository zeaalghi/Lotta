# Setup & Development Guide — LOTTA

## 1. Prasyarat
- **Node.js**: v20+ (LTS)
- **Package Manager**: `npm` v10+

## 2. Perintah Utama

```bash
# Install dependensi
npm install

# Jalankan development server (http://localhost:3000)
npm run dev

# Jalankan 5-stage Gate Check (WAJIB di akhir setiap slice)
npm run gate
```

## 3. Variabel Environment (`.env.example`)
```ini
# Nomor WhatsApp Resmi Satu Pintu Admin LOTTA (Format Internasional tanpa +)
NEXT_PUBLIC_LOTTA_WHATSAPP_NUMBER="6281234567890"
```
