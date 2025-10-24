# PeerSkills – Peer Learning Platform



PeerSkills is a full-stack web application that allows users to **share skills they can teach**, find others to **learn from**, 
and **connect with like-minded peers**. Built with **React, Node.js, Express, MongoDB**, and deployed on **Netlify (frontend)** and **Render (backend)**, 
this project is a complete end-to-end solution for peer learning.

---

## 🌟 Features

- **User Authentication**
  - Register and login using email and password
  - JWT-based authentication for secure routes
- **Skill Management**
  - Add, view, and remove skills you can **teach** or want to **learn**
  - Prevent duplicate skills
- **User Search**
  - Search for users based on the skill they can teach or want to learn
  - Case-insensitive search
- **Connections**
  - Send connection requests to other users
  - Mutual connection management
- **Responsive Design**
  - Works well on both desktop and mobile devices
- **Error Handling**
  - Backend has centralized error handling
  - Friendly messages for users on frontend

---

## 🛠️ Tech Stack

**Frontend:**
- React + Vite
- React Router
- Axios
- CSS (custom)

**Backend:**
- Node.js + Express
- MongoDB Atlas (cloud database)
- Mongoose (ODM)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

**Deployment:**
- Frontend: Netlify
- Backend: Render

---

## 📁 Project Structure

```
PeerSkills/
├── client/           # React frontend
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       └── App.jsx
│   └── package.json
├── server/           # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
├── README.md
```



1️⃣ Peer Learning & Mentorship
	•	Students or professionals can list skills they can teach (e.g., React, Python).
	•	Others can search for these skills to learn from peers instead of formal courses.
	•	Example: A React beginner finds a senior peer who can teach React and connects with them.


2️⃣ Skill Discovery
	•	Users can see what skills are popular among peers.
	•	Helps identify trending technologies or areas to focus on.
	•	Example: Someone wants to learn Django — searches and finds multiple users with Django as a teaching skill.

3️⃣ Collaboration & Networking
	•	Users can connect with others who have complementary skills.
	•	Encourages study groups, project collaborations, and networking.
	•	Example: A student learning Machine Learning connects with someone teaching Python.


4️⃣ Personal Skill Management
	•	Users can track skills they can teach and skills they want to learn.
	•	Helps build a personal skill roadmap.
	•	Example: A developer maintains a list of teachable skills (NodeJS, React) and learning goals (Django, SQL).



