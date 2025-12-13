# Movie Poll Platform

A highly interactive, responsive polling application where users can vote on movies, view live results, search, filter, and rate movies.  
Built with **React + Vite, Zustand, Tailwind CSS, Chart.js**, and a custom mock API simulating real-time updates.

---

## Live Demo

👉 **Live URL:** https://movie-polls-puce.vercel.app/  
👉 **Demo Video :** https://drive.google.com/file/d/1j-nCXCSL0armNywCCrNbSdjFVJVdEg_l/view?usp=sharing

---

## Project Overview

This project is designed to demonstrate:

- Efficient state management for complex UI  
- Optimistic UI updates for instant feedback  
- Infinite scrolling for large datasets  
- Real-time live poll result updates  
- Accessible and responsive UI components  
- Search + autocomplete, filtering, star rating, and modal interactions  

The app provides a smooth, engaging user experience similar to modern interactive platforms.

---

## Features

### 🔹 Polls & Voting
- Displays a list of movie polls  
- **Infinite scroll** loads more polls automatically  
- Optimistic UI voting system  
- Users can change votes (latest vote updates count)  
- Vote history persists during the session  

### 🔹 Real-Time Results
- Refreshes every **8 seconds**  
- Progress bars update automatically  

### 🔹 Modal with Chart
- Doughnut chart (Chart.js)  
- Vote statistics  
- Poll information  

### 🔹 Movie Rating System
- Accessible 5-star rating  
- Optimistic UI updates  

### 🔹 Search & Filters
- Autocomplete search  
- Filter by **Genre** and **Status**  
- Dynamic results  

### 🔹 User Feedback
- Toast notifications for success/error  
- Rollback on failed operations  

### 🔹 Responsive & Accessible
- Mobile-first design  
- Keyboard navigation  
- ARIA-friendly components  

---

## Tech Stack

### **Frontend**
- React (Vite)

### **State Management**
- Zustand

### **Styling**
- Tailwind CSS

### **Charts**
- Chart.js + react-chartjs-2

### **Notifications**
- react-hot-toast

### **Mock API**
- Custom mock backend  
- Generates 2000 polls  
- Simulates latency + failures  

### **Deployment**
- Vercel (auto-build & deploy)

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

### 1️ Clone the Repository

- git clone https://github.com/AmruthaImmidisetti/movie-polls.git
- cd movie-polls
  
### 2️ Install Dependencies
- npm install

### 3️ Run Development Server
- npm run dev

### 4️ Build for Production
- npm run build

### 5️ Preview Production Build
- npm run preview


---

## Architectural Decisions

### State Management (Zustand)
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

### Optimistic UI
- Votes & ratings update instantly  
- Rollback occurs if API fails  

---

### Mock API Design
- Generates 2000+ polls  
- Supports search, filters, pagination  
- Simulates latency + random failures  

---

### Reusable Components
- **PollCard**  
- **StarRating**  
- **SearchBar**  
- **FilterDropdown**  
- **ResultsModal**  
- **useInfiniteScroll**  

---

### Accessibility
- Semantic HTML  
- ARIA roles  
- Keyboard-friendly stars & modal  

---

## Testing Checklist

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
- Auto-build & auto-deploy on push to main
