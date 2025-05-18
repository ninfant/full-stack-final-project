# 🏁 Feature Flag Microservice for Continuous Delivery – Final Project

This project implements a secure, real-time **Feature Flag Management System** designed for controlled, zero-downtime releases. It enables developers and teams to dynamically toggle features by **region** and **customer** using a protected admin dashboard and a consumer-facing microservice architecture.

---

## 🚀 Live Demo

- **Admin Panel**: https://full-stack-final-project-leqr.onrender.com
- **Consumer Microservice (MS2)**: https://your-ms2-url.onrender.com

> Requires a valid JWT to access the admin panel.

---

## 🧩 Tech Stack

| Layer         | Stack                                      |
| ------------- | ------------------------------------------ |
| Frontend      | React + Vite + Material UI                 |
| Backend       | Node.js + Express + PostgreSQL + Knex.js   |
| Auth          | JSON Web Tokens (JWT)                      |
| Microservices | MS1 (Admin + API) / MS2 (Feature Consumer) |
| Deployment    | Render.com (Full-stack deployment)         |

---

## 🎯 Features

✅ Create, enable/disable, and delete feature flags  
✅ Assign flags to specific customers or regions  
✅ Full admin dashboard with JWT-based login  
✅ Real-time flag consumption from a second microservice  
✅ Safe rollouts: no redeployments, no service interruption  
✅ Supports feature targeting and experimentation

---

## 🔧 Project Structure

full-stack-final-project/
├── backend/ # MS1 backend (API + dashboard server)
├── frontend/ # MS1 frontend (admin dashboard - React)
├── micro-service-demo/
│ ├── ms-backend/ # MS2 backend (flag consumer)
│ └── ms-frontend/ # MS2 frontend (user-facing demo)

## 🔐 Security

- ✅ All API routes are protected using API Keys and JWTs
- ✅ Admin dashboard login required for all management tasks
- ✅ Microservice-to-API access uses secure technical credentials

---

## 📦 Deployment on Render

Each part of the system is deployed as an individual **Web Service** on [Render](https://render.com):

### 🧠 Feature Flag System (MS1) → `full-stack-final-project`

- `frontend` → React dashboard (built and served via Express)
- `backend` → Node.js + Express + PostgreSQL REST API
- 🔐 Protected with JWT authentication and API key

### ⚙️ Demo Consumer App (MS2) → `demo-app`

- `ms-frontend` → Static Vite + React UI that fetches flag state on load
- `ms-backend` → Lightweight Node.js/Express server that consumes flags from MS1 in real time using a bootdata endpoint

## 🧪 Microservice Integration

The **MS2** consumer service fetches feature flags in real-time via `/bootdata` and adjusts behavior accordingly. Examples:

- `enableExtraText`: Controls whether to show a pharragraf or to extend it to two
- `darkMode`: Enables dark theme for the app
- `contactUs`: Shows/hides the "Contact Us" section dynamically

Feature flags are managed centrally in MS1 and consumed seamlessly by MS2 using RESTful API calls.

## 📚 Learnings

✅ Utilized JWT and localStorage for secure auth  
✅ Implemented live flag-based UI rendering  
✅ Designed safe rollout patterns using feature toggles  
✅ Practiced microservices architecture and integration  
✅ Gained experience with real deployment workflows (Render)

## 👩‍💻 Author

** [Noilsa Infante ]**  
Final Project – Feature Flag Microservice for Continuous Delivery  
GitHub:(https://github.com/ninfant)
