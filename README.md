# 🚀 AI Resume Analyzer

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Backend-Flask-000000?logo=flask)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python)
![Status](https://img.shields.io/badge/Status-Active-success)

An intelligent full-stack web application that analyzes resumes based on selected job roles and provides a skill match score with improvement suggestions.

Built using **React (Frontend)** and **Flask (Backend)**.

---

## 📌 Features

- ✅ User Authentication (Register / Login)
- ✅ Resume Text Analysis
- ✅ PDF & DOCX Resume Upload Support
- ✅ Role-Based Skill Matching
- ✅ Match Score Calculation
- ✅ Personalized Feedback Message
- ✅ Resume Analysis History Tracking
- ✅ Clean and Responsive UI

---

## 🧠 How It Works

1. User registers and logs in.
2. User selects a target role:
   - Frontend Developer
   - Backend Developer
   - Full Stack Developer
3. User uploads a resume (PDF/DOCX) or pastes resume text.
4. The system:
   - Extracts resume content
   - Matches skills using keyword detection
   - Calculates a match percentage score
   - Displays found and missing skills
5. All analyses are stored in user history.

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React
- React Router
- Axios
- JavaScript (ES6)
- CSS

### 🔹 Backend
- Flask
- Flask-CORS
- PyPDF2
- docx2txt
- Python

---

## 📂 Project Structure

ai-resume-analyzer/
│
├── backend/
│ ├── app.py
│
├── frontend/
│ ├── src/
│ ├── package.json
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/soniachahar55/ai-resume-analyzer.git
cd ai-resume-analyzer

2️⃣ Backend Setup
cd backend
python -m venv venv
pip install flask flask-cors PyPDF2 docx2txt
python app.py


Backend runs at:
👉 http://127.0.0.1:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs at:
👉 http://localhost:3000

📊 Resume Scoring Logic

The system:

Compares resume skills with predefined role skill sets

Calculates percentage match

📈 Score Classification
Score Range	Feedback
80%+	Excellent Match
50%–79%	Good Match – Improve Missing Skills
Below 50%	Resume Needs Improvement
🚀 Future Improvements

🔐 JWT Authentication

🗄 Database Integration (MongoDB)

🤖 Advanced NLP-based Skill Detection

🌍 Deployment (Render / Vercel)

📄 Downloadable PDF Report

👩‍💻 Author

Sonia Chahar
GitHub: https://github.com/soniachahar55

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!