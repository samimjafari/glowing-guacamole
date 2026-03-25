# AI LLM Studio Alpha

نسخه اولیه یک استودیو آفلاین برای مدیریت پروژه و اجرای مدل‌های GGUF در مرورگر/اپ.

## امکانات فعلی
- رابط فارسی RTL با سه بخش: پروژه‌ها، چت، تنظیمات.
- مدیریت پروژه: ایجاد، ویرایش، حذف و خروجی JSON/MD/TXT.
- حافظه دائمی (Persistent Memory) با `localStorage` برای پروژه‌ها، چت و تنظیمات.
- اسکلت اجرای آفلاین GGUF با آداپتر `Wllama`.
- اسکریپت‌های نصب خودکار ابزارها برای Linux/Kali/Windows.
- آماده‌سازی خروجی دسکتاپ EXE (Electron) و موبایل APK (Capacitor).

## اجرا
```bash
npm install
npm run serve
# open http://localhost:4173
```

## ساخت EXE (Windows)
```bash
npm run desktop:build
```

## ساخت APK (Android)
```bash
npm run mobile:apk
```

## نصب ابزارهای توسعه
```bash
npm run tools:linux
npm run tools:kali
npm run tools:windows
```

## رفع خطای اجرای Electron روی Linux/Kali
اگر در اجرای `npm run desktop:dev` با خطایی شبیه
`error while loading shared libraries: libatk-1.0.so.0`
روبرو شدید، اسکریپت‌های `tools:linux` و `tools:kali` اکنون
پکیج‌های لازم Electron را هم نصب می‌کنند. کافی است دوباره
اسکریپت نصب ابزارها را اجرا کنید.

## نکته مهم
برای اجرای واقعی مدل GGUF باید بخش کامنت‌شده‌ی `lib/wllama-adapter.js` را با تنظیمات واقعی Wllama و فایل‌های wasm/worker تکمیل کنید.
