# 🎬 Movie Poll Platform

A highly interactive, responsive polling application where users can vote on movies, view live results, search, filter, and rate movies.  
Built with **React + Vite, Zustand, Tailwind CSS, Chart.js**, and a custom mock API simulating real-time updates.

---

## 🚀 Live Demo

👉 **Live URL:** [https://YOUR-VERCEL-URL.vercel.app  ](https://movie-polls-puce.vercel.app/)
👉 **Demo Video (2–4 mins):** VIDEO_URL_HERE

---

## 📌 Project Overview

This project is designed to demonstrate:

- Efficient state management for complex UI
- Optimistic UI updates for instant feedback
- Infinite scrolling for large datasets
- Real-time live poll result updates
- Accessible and responsive UI components
- Search + autocomplete, filtering, star rating, and modal interactions

The app provides a smooth, engaging user experience similar to modern interactive platforms.

---

## 🎯 Features

### 🔹 Polls & Voting
- Displays a list of movie polls.
- **Infinite scroll** loads more polls automatically as the user scrolls.
- Users can vote on one option per poll.
- Voting uses **optimistic UI updates** — results appear instantly.
- Users can **change their vote** (latest vote updates counts correctly).
- Vote history persists during the session.

### 🔹 Real-Time Results
- Poll data refreshes every **8 seconds** to simulate live updates.
- Progress bars update automatically without page reload.

### 🔹 Modal with Chart
- Clicking **View Details** opens a modal showing:
  - Doughnut chart (Chart.js)
  - Vote statistics
  - Poll information

### 🔹 Movie Rating System
- Fully accessible 5-star rating component.
- Ratings update optimistically and reflect immediately.

### 🔹 Search & Filters
- Search bar with **autocomplete suggestions**.
- Filters:
  - By **Genre** (Action, Comedy, Drama, etc.)
  - By **Status** (Active, Closed)
- Dynamic updates — results refresh instantly.

### 🔹 User Feedback
- Toast notifications (react-hot-toast) for:
  - Successful voting
  - Errors
  - Rollbacks

### 🔹 Responsive & Accessible
- Mobile-first layout (1 or 2 columns depending on screen size).
- Keyboard-friendly navigation.
- ARIA-friendly components & semantic HTML.

---

## 🛠️ Tech Stack

### **Frontend Framework**
- React (Vite)

### **State Management**
- Zustand (lightweight and powerful)

### **Styling**
- Tailwind CSS

### **Data Visualization**
- Chart.js + react-chartjs-2

### **Notifications**
- react-hot-toast

### **Mock API**
- Custom mock backend using JavaScript  
- Generates 2000 polls for infinite scrolling  
- Simulates realistic network latency  
- Supports: fetch polls, submit vote, submit rating, refresh

### **Deployment**
- Vercel (auto-build and deploy on every push)

---

## 📁 Project Structure
- src/
- ├── api/
- │ ├── mockData.js
- │ └── pollsApi.js
- ├── components/
- │ ├── PollCard.jsx
- │ ├── PollList.jsx
- │ ├── SearchBar.jsx
- │ ├── FilterDropdown.jsx
- │ ├── ResultsModal.jsx
- │ ├── StarRating.jsx
- │ └── Toasts.jsx
- ├── hooks/
- │ ├── useInfiniteScroll.js
- │ └── useLiveRefresh.js
- ├── store/
- │ └── usePollStore.js
- ├── App.jsx
- ├── main.jsx
- ├── index.css


---

## 🧩 Installation & Setup (Run Locally)

### 1️⃣ Clone the Repository

- git clone https://github.com/YOUR-USERNAME/movie-polls.git
- cd movie-polls
  
### 2️⃣ Install Dependencies
- npm install

### 3️⃣ Run Development Server
- npm run dev

### 4️⃣ Build for Production
- npm run build

### 5️⃣ Preview Production Build
- npm run preview


---

## 🧠 Architectural Decisions

### 🟦 State Management (Zustand)
Chosen over Redux because:

- Simpler API  
- Lightweight  
- Perfect for managing:
  - Filters
  - Search queries
  - Poll data
  - Infinite scroll
  - Modal state

---

### 🟩 Optimistic UI
- Votes & ratings update instantly  
- Rollback occurs if API fails  

---

### 🟨 Mock API Design
- Generates 2000+ polls  
- Supports search, filters, pagination  
- Simulates latency + random failures  

---

### 🟧 Reusable Components
- **PollCard**  
- **StarRating**  
- **SearchBar**  
- **FilterDropdown**  
- **ResultsModal**  
- **useInfiniteScroll**  

---

### 🟪 Accessibility
- Semantic HTML  
- ARIA roles  
- Keyboard-friendly stars & modal  

---

## 🧪 Testing Checklist

- Infinite scroll works  
- Votes update instantly (optimistic)  
- Changing vote updates counts correctly  
- Live refresh updates polls  
- Filters work dynamically  
- Search autocomplete works  
- Modal shows chart + details  
- Rating works  
- Responsive (mobile → desktop)  
- Keyboard accessible  

---

## 🌐 Deployment

- Deployed on **Vercel**  
- Auto-build & auto-deploy on push to `main`
- 

The app is deployed on Vercel, which builds and redeploys automatically on every push to the `main` branch (configurable in Vercel project settings). [web:38][web:41]  
