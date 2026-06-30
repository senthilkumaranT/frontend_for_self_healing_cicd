# Cookie Shop (Frontend & CI/CD Demo)

A React application built with **Vite** and styled with **Tailwind CSS (v4)**. This project includes a shopping cart component with automated test coverage used to demonstrate self-healing CI/CD pipeline capabilities.

---

## 🍪 Key Features

- **Menu & Cart Management**: Browse cookies, add items to the shopping cart, and calculate pricing.
- **Modern Styling**: Styled using utility classes from Tailwind CSS (v4) and icons from Lucide React.
- **Unit Testing**: Pre-configured test suite powered by **Vitest** for verifying cart logic (discounts, subtotals, and calculations).

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🏃 Getting Started

### 1. Installation
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

### 2. Running in Development
Start the local development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to view the application.

### 3. Running Tests
Run the Vitest test suite:
```bash
npm run test
```

### 4. Production Build
Bundle the application for production:
```bash
npm run build
```

---

## 🤖 Integration with Self-Healing CI/CD

This repository contains intentional edge-case bugs (e.g., in `src/utils/cookieUtils.js` where discount math is calculated incorrectly) that cause automated tests to fail in CI/CD. 

When the tests fail, a webhook notifies the backend server, triggering an autonomous AI agent to read the logs, locate the error, apply a patch, and open a Pull Request to fix the code automatically.
