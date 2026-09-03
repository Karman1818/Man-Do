# 🚀 Man-Do

> **A Modern Productivity & Fitness Tracking Web Application**  
> Streamline your daily habits, stay accountable with point-weighted task tracking, log fitness milestones, and analyze your progress over time through interactive analytics.

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Firebase Configuration](#firebase-configuration)
- [Available Scripts](#-available-scripts)
- [Architecture & Data Flow](#-architecture--data-flow)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Man-Do** is an all-in-one productivity and fitness tracking web application engineered with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Firebase**. 

Unlike standard to-do lists, Man-Do introduces a **point-weighted task system** where users assign weight to each item on their task list. This allows users to quantify their productivity score day-by-day and compare current scores with historical benchmarks (e.g. comparing today's performance against 1 month ago). In addition, Man-Do provides a dedicated **workout tracker** for logging exercise routines, creating a unified hub for personal growth and physical well-being.

---

## ✨ Key Features

- 🔐 **OAuth Authentication**: Secure user login with Google and GitHub providers powered by **Firebase Auth**.
- 📋 **Point-Weighted To-Do Tracker (`/activity`)**:
  - Add custom tasks and assign target point values.
  - Interactive status toggles (`is_done`) with real-time score updates.
  - Automatically calculates total available vs. earned points per day.
  - Real-time persistence and historical archiving via **Cloud Firestore**.
- 🏋️ **Fitness & Workout Log (`/training`)**:
  - Record daily workout sessions with exercise names and custom date stamps.
  - Reverse-chronological history view for tracking training consistency.
- 📊 **Interactive Data Analytics**:
  - Embedded MUI Bar Charts (`@mui/x-charts`) for visual progress tracking.
  - Side-by-side progress comparison comparing current daily output against historical benchmarks.
- 📅 **Date-Based Logging**: Integrated date selection (`react-datepicker`) enabling historical entries and date-specific records.
- 🎨 **Modern Design & Typography**: Clean aesthetic powered by **Tailwind CSS**, Lucide Icons, and custom typography featuring Google Fonts (**Lexend Exa** & **Geist**).

---

## 🛠️ Tech Stack

### **Frontend & Framework**
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & `@emotion/styled`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Visualization**: [MUI X-Charts](https://mui.com/x/react-charts/) (`@mui/x-charts`) & `@mui/material`
- **Date Utilities**: `react-datepicker`

### **Backend & Database**
- **Authentication**: Firebase Auth (Google & GitHub OAuth)
- **Database**: Google Cloud Firestore (Real-time NoSQL Database)

---

## 📁 Project Structure

```text
Man-Do/
├── app/
│   ├── activity/          # Task & activity tracking page (/activity)
│   ├── login/             # User authentication page (/login)
│   ├── training/          # Workout tracking page (/training)
│   ├── components/        # Reusable UI components
│   │   ├── activity.tsx
│   │   ├── footer.tsx
│   │   ├── githubbutton.tsx
│   │   ├── googlebutton.tsx
│   │   ├── loginaccesspage.tsx
│   │   ├── loginscreen.tsx
│   │   ├── logo.tsx
│   │   ├── logoutbutton.tsx
│   │   ├── logoutscreen.tsx
│   │   ├── navbar.tsx
│   │   ├── pointscharts.tsx
│   │   ├── pointshistory.tsx
│   │   ├── titlescreen.tsx
│   │   ├── titlescreenbutton.tsx
│   │   ├── todo.tsx
│   │   ├── todowithdate.tsx
│   │   ├── training.tsx
│   │   ├── trainingcharts.tsx
│   │   ├── traininghistory.tsx
│   │   └── trainingwithdate.tsx
│   ├── globals.css        # Global CSS & Tailwind directives
│   ├── layout.tsx         # Root layout with font imports & structure
│   └── page.tsx           # Home landing page
├── public/                # Static assets & SVG icons
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── postcss.config.mjs     # PostCSS configuration
├── tailwind.config.ts     # Tailwind CSS theme & plugin configuration
├── tsconfig.json          # TypeScript compiler options
└── package.json           # Project dependencies & scripts
```

---

## 🚀 Getting Started

Follow these steps to set up and run Man-Do on your local development machine.

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.17.0` or higher (Node.js 20+ recommended)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Man-Do.git
   cd Man-Do
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

---

### Firebase Configuration

This project requires a Firebase project for Authentication and Firestore.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Firestore Database** and **Authentication** (enable Google and GitHub sign-in providers under Authentication settings).
3. In your Firebase project settings, obtain your Web App configuration credentials.
4. Create a file named `firebase.config.ts` in the **root directory** of the project:

```typescript
// firebase.config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

> ⚠️ **Note**: `firebase.config.ts` is included in `.gitignore` to protect sensitive credentials.

---

## 📜 Available Scripts

In the project directory, you can run the following commands:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode using Next.js Turbopack at [http://localhost:3000](http://localhost:3000). |
| `npm run build` | Compiles and builds the app for production deployment. |
| `npm run start` | Starts the production server after building. |
| `npm run lint` | Runs ESLint to check for code quality and syntax errors. |

---

## 🏗️ Architecture & Data Flow

1. **Authentication Flow**:
   - Unauthenticated visitors accessing `/activity` or `/training` are greeted with the `LoginAccessPage` prompt.
   - Users authenticate via Google or GitHub OAuth. Firebase Auth persists session state across page navigation.
2. **Firestore Collections**:
   - `Data`: Stores daily to-do items (`task`, `is_done`, `points`).
   - `Dates_and_Points`: Archives aggregate daily points metrics (`date`, `completed_points`, `total_points`).
   - `Trainings`: Stores logged workout entries (`training`, `date`).
3. **Real-Time Data Sync**:
   - Firestore `onSnapshot` listeners automatically update UI states upon task updates, additions, or deletions without requiring page refreshes.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check out the [issues page](https://github.com/your-username/Man-Do/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
