from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import docx2txt
from PyPDF2 import PdfReader
from datetime import datetime

app = Flask(__name__)
CORS(app)

ROLE_SKILLS = {
    "frontend": ["React", "HTML", "CSS", "JavaScript", "Git"],
    "backend": ["Python", "Flask", "Node.js", "Git"],
    "fullstack": ["Python", "React", "Flask", "Node.js", "HTML", "CSS", "JavaScript", "Git"]
}

users = []
analysis_history = []  # ⭐ NEW

def analyze_logic(text, role, email):
    text_lower = text.lower()
    target_skills = ROLE_SKILLS.get(role, ROLE_SKILLS["fullstack"])

    found_skills = []
    missing_skills = []

    for skill in target_skills:
        if re.search(r'\b' + re.escape(skill.lower()) + r'\b', text_lower):
            found_skills.append(skill)
        else:
            missing_skills.append(skill)

    total_skills = len(target_skills)
    score = int((len(found_skills) / total_skills) * 100) if total_skills > 0 else 0

    if score >= 80:
        message = "Excellent! Your resume strongly matches this role."
    elif score >= 50:
        message = "Good match. Improve missing skills."
    else:
        message = "Resume needs improvement."

    # ⭐ SAVE TO HISTORY
    analysis_history.append({
        "email": email,
        "role": role,
        "score": score,
        "date": datetime.now().strftime("%Y-%m-%d %H:%M")
    })

    return jsonify({
        "foundSkills": found_skills,
        "missingSkills": missing_skills,
        "score": score,
        "message": message
    })

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    data = request.json
    resume_text = data.get("resumeText", "")
    role = data.get("role", "fullstack")
    email = data.get("email")

    return analyze_logic(resume_text, role, email)

@app.route('/analyze-file', methods=['POST'])
def analyze_file():
    file = request.files.get("resume")
    role = request.form.get("role", "fullstack")
    email = request.form.get("email")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    text = ""
    if file.filename.endswith(".pdf"):
        reader = PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() + " "
    elif file.filename.endswith(".docx"):
        text = docx2txt.process(file)
    else:
        return jsonify({"error": "Unsupported file type"}), 400

    return analyze_logic(text, role, email)

@app.route('/history/<email>', methods=['GET'])
def get_history(email):
    user_history = [h for h in analysis_history if h["email"] == email]
    return jsonify(user_history)

# ---------------- AUTH ROUTES ----------------

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    if any(u["email"] == email for u in users):
        return jsonify({"error": "User already exists"}), 400

    users.append({"email": email, "password": password})
    return jsonify({"message": "Registered successfully"}), 200


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = next((u for u in users if u["email"] == email and u["password"] == password), None)

    if user:
        return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(port=5000, debug=True)
