# AI LLM Studio Alpha

نسخه اولیه‌ی یک محیط توسعه و اجرای مدل آفلاین که برای وب، دسکتاپ (EXE) و موبایل (APK) طراحی شده است.

## ویژگی‌ها

- رابط کاربری ماژولار با سه فایل مجزا:
  - `index.html`
  - `styles.css`
  - `app.js`
- پشتیبانی عملیاتی از مدیریت پروژه‌های Python / JavaScript / C++.
- حافظه دائمی (Persistent Memory) با `localStorage` برای:
  - تاریخچه گفتگو
  - تنظیمات مدل
  - لیست پروژه‌ها
- پایه‌ی اتصال به **Wllama** برای بارگذاری فایل‌های GGUF.
- اسکریپت آماده‌سازی خودکار محیط توسعه روی لینوکس/Kali.
- اسکلت خروجی:
  - دسکتاپ EXE (Electron)
  - موبایل APK (Capacitor + Android)

## اجرا (وب)

```bash
python3 -m http.server 4173
# سپس مرورگر: http://localhost:4173
```

## ساخت EXE

```bash
npm install
npm run build:exe
```

خروجی داخل پوشه `dist/` ساخته می‌شود.

## ساخت APK

> پیش‌نیاز: Android Studio + SDK + JDK

```bash
npm install
npm run mobile:add:android
npm run build:apk
```

## نصب خودکار ابزارهای برنامه‌نویسی (Kali/Linux)

```bash
sudo ./setup/setup-dev-env.sh
```

این اسکریپت نصب پایه ابزارهای Python/Node/C++ را انجام می‌دهد.

## نکته Wllama

در `app.js` بارگذاری Wllama به‌شکل نمونه پیاده‌سازی شده است. برای اجرای کاملاً آفلاین، فایل‌های Wllama را به‌صورت محلی در پروژه قرار دهید و import را از CDN به مسیر محلی تغییر دهید.
