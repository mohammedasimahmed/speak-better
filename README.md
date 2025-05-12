# SpeakBetter

**SpeakBetter** is an AI-powered platform built by **Mohammed Asim Ahmed** to help users improve their speaking skills. By analyzing both speech and facial expressions, SpeakBetter generates suggestions that help users to improve their speeches.

Using modern technologies like LLMs and face detection, it evaluates and enhances your speech across three key dimensions:

* **Emotion** – Finds sentences where the speaker’s emotions could be improved to make the speech more engaging.
* **Clarity** – Highlights areas where the speech could be clearer and provides suggestions for improvement.
* **Relevance** – Points out sections that are off-topic or unnecessary.

SpeakBetter is a great platform to practice and refine your speeches before delivering them.

---

## 📁 Monorepo Structure (Turborepo)

```
apps/
├── frontend         # Next.js + TailwindCSS + Jotai + face-api.js
└── backend          # Express.js + LangChain + Prisma + PostgreSQL + Bloom Filter + Cache
```

---

## 🚀 Features

* 🧑‍💻 Record your speech and facial expressions
* 🤖 Analyze speech using an LLM (via LangChain + Google Gemini)
* 🧍 Emotion detection from facial expressions (via `face-api.js`)
* 🧠 Smart feedback on speech emotion, clarity, and relevance
* ⚡ Fast and optimized email/username check during registration:

  * Bloom Filter → Cache → PostgreSQL DB
  * TTL (Time to Live) – cached items automatically expire after a set duration
* 🧹 Code and Commit quality enforced using ESLint, Commitlint, Husky, and `lint-staged`

---

## 🧪 Bloom Filter + Cache Workflow

On **user registration**:

1. 🔍 **Bloom Filter** is checked for email/username:

   * If **not present** → definitely doesn’t exist → continue registration.
   * If **might be present** → go to step 2.
2. ⚡ **Cache (with TTL)** is checked:

   * If **cache hit** → respond that user/email exists.
   * If **cache miss** → check the **PostgreSQL database**.
3. 🗂️ If found in DB → return conflict + update cache.
4. ✅ If not in DB → safe to register → update Bloom Filter + update cache.

---

## ⚙️ Tech Stack

### Frontend (`apps/frontend`)

* **Framework**: Next.js
* **UI**: Tailwind CSS, `clsx`, `tailwind-merge`
* **State**: `jotai`
* **Face Detection**: `face-api.js`
* **Animations**: `motion`
* **Lang**: TypeScript

### Backend (`apps/backend`)

* **Server**: Express
* **LLM**: LangChain + Google Gemini
* **Auth & Security**: JWT, bcrypt, helmet, zod
* **Database**: PostgreSQL via Prisma
* **Existence Check**: Bloom Filters + In-Memory Cache with TTL
* **Dev Tools**: ts-node-dev, nodemon

---

## 🔍 Linting, Formatting & Commits

### ✅ ESLint Rules

Eslint rules are added, like:

* No unused variables or expressions
* No `else` after `return`
* Always use semicolons
* Functions must have consistent return behavior
* Maximum of 4 parameters per function
* No trailing spaces
* 2-space indentation
* Double quotes preferred

### `lint-staged` + Husky

* Ensures only **staged files** are linted before commit.
* Prevent bad commits while keeping workflow fast.

### Husky Hooks

* `pre-commit`: Runs `npm run build` and `npx lint-staged`
* `commit-msg`: Uses `commitlint` npm package to enforce conventional commit messages

---

## 📦 Database

* **PostgreSQL**
* ORM: **Prisma** with **Accelerate extension** for optimized performance

```bash
# Run migrations
npx prisma migrate dev

# Generate client
npx prisma generate --no-engine
```

---

## 🧪 Development

### Prerequisites

* Node.js ≥ 18
* PostgreSQL
* Turbo CLI: `npm install -g turbo`

### Setup

```bash
git clone https://github.com/mohammedasimahmed/SpeakBetter.git
cd SpeakBetter
npm install
```

After installing dependencies, run the following command in the `apps/backend/prisma` folder to generate the Prisma client:

```bash
npx prisma generate --no-engine
```

---

## ⚠️ Browser Compatibility

> **Note:** SpeakBetter currently supports **only the Chrome browser**

---

## 📌 Root-level Scripts

```bash
# Start all apps in development mode
npm run dev

# Build all apps
npm run build

# Run the production build
npm run start

# Lint all apps
npm run lint

# Auto-fix some linting issues in all apps
npm run lint:fix

# Format codebase using Prettier
npm run format
```

---

## 🤝 Contributing

Feel free to fork and contribute! Make sure to follow lint and commit rules before submitting a pull request.