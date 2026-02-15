🚀 AI Resume Analyzer








An intelligent web application that analyzes resumes based on selected job roles and provides a skill match score with improvement suggestions.

Built using React (Frontend) and Flask (Backend).

📌 Features

✅ User Authentication (Register / Login)

✅ Resume Text Analysis

✅ PDF & DOCX Resume Upload Support

✅ Role-Based Skill Matching

✅ Match Score Calculation

✅ Personalized Feedback Message

✅ Resume Analysis History Tracking

✅ Clean and Responsive UI

🧠 How It Works

User registers and logs in.

User selects a target role:

Frontend

Backend

Fullstack

User uploads a resume (PDF/DOCX) or pastes resume text.

The system:

Extracts resume content

Matches skills using keyword detection

Calculates a match score

Displays missing and found skills

All analyses are stored in user history.

🛠️ Tech Stack
🔹 Frontend

React

React Router

Axios

JavaScript

CSS

🔹 Backend

Flask

Flask-CORS

PyPDF2

docx2txt

Python

📂 Project Structure
ai-resume-analyzer/
│
├── backend/
│   ├── app.py
│
├── frontend/
│   ├── src/
│   ├── package.json
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone Repository
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
📌 Future Improvements

🔐 JWT Authentication

🗄 Database Integration (MongoDB)

🤖 Advanced NLP-based Skill Detection

🌍 Deployment (Render / Vercel)

📄 Downloadable PDF Report

👩‍💻 Author

Sonia Chahar
GitHub: https://github.com/soniachahar55

⭐ Support

If you like this project, give it a ⭐ on GitHub!