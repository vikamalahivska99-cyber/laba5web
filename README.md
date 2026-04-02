# Веб-сайт (лабораторна робота)

## Пункт 2: публічний репозиторій і код сайту

- **Репозиторій (публічний):** [https://github.com/vikamalahivska99-cyber/laba5web](https://github.com/vikamalahivska99-cyber/laba5web)
- **Вміст папки з кодом:**
  - `index.html` — розмітка сторінки (резюме, коментарі, футер з localStorage, модальна форма)
  - `styles.css` — стилі
  - `script.js` — localStorage, запит до JSONPlaceholder, тема день/ніч, модалка через 1 хв
  - `.gitignore` — службові файли не потрапляють у репозиторій

## Як переглянути сайт локально

У папці проєкту виконати:

```bash
python3 -m http.server 8000
```

Відкрити в браузері: `http://localhost:8000/index.html`

## Пункт 3: публікація на Vercel

1. Зайти на [vercel.com](https://vercel.com) → **Sign Up** → увійти через **GitHub**.
2. **Add New…** → **Project** → **Import** репозиторій `laba5web`.
3. Налаштування залишити за замовчуванням (статичний сайт з кореня репо, `index.html` у корені).
4. Натиснути **Deploy**. Після збірки з’явиться посилання виду `https://laba5web-xxx.vercel.app` — його вставити в звіт разом зі скріншотом сторінки.

Після кожного `git push` у гілку `main` Vercel зазвичай **автоматично** перезбирає й оновлює сайт (п. 4).
