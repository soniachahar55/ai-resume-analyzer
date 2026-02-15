import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./Home.css";

function Home() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [fileName, setFileName] = useState("");
  const [role, setRole] = useState("fullstack");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

 const analyzeResume = async () => {
  if (!user) {
    alert("Please login to analyze resumes.");
    return;
  }

  try {
    setLoading(true);
    let response;

    const fileInput = document.querySelector("input[type='file']");

    if (fileInput.files.length > 0) {
      const formData = new FormData();
      formData.append("resume", fileInput.files[0]);
      formData.append("role", role);
      formData.append("email", user.email);

      response = await axios.post(
        "http://127.0.0.1:5000/analyze-file",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      response = await axios.post("http://127.0.0.1:5000/analyze", {
        resumeText,
        role,
        email: user.email
      });
    }

    setResult(response.data);
  } catch (error) {
    alert("Error analyzing resume");
  } finally {
    setLoading(false);
  }
};

  const downloadReport = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.text("AI Resume Analyzer Report", 10, 10);
    doc.text("Role: " + role, 10, 20);
    doc.text("Score: " + result.score + "%", 10, 30);
    doc.text("Found Skills: " + result.foundSkills.join(", "), 10, 40);
    doc.text("Missing Skills: " + result.missingSkills.join(", "), 10, 50);
    doc.save("resume_report.pdf");
  };

  const getScoreColor = () => {
    if (!result) return "#667eea";
    if (result.score >= 80) return "#28a745";
    if (result.score >= 50) return "#ffc107";
    return "#dc3545";
  };

  return (
    <div className="home-container">
      <div className="analyzer-card">
        <h1 className="title">AI Resume Analyzer</h1>
        <p className="subtitle">
          Upload or paste your resume and get instant skill analysis.
        </p>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-select"
        >
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Developer</option>
          <option value="fullstack">Full Stack Developer</option>
        </select>

        <input type="file" className="file-input" />
        <textarea
          placeholder="Paste your resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows="8"
          className="resume-textarea"
        />

        <button
          onClick={analyzeResume}
          disabled={loading}
          className="analyze-btn"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div className="result-section">
            <button onClick={downloadReport} className="download-btn">
              Download Report
            </button>

            <h2 style={{ color: getScoreColor() }}>
              ⭐ Resume Match Score: {result.score}%
            </h2>

            <div
              style={{
                width: "100%",
                backgroundColor: "#e0e0e0",
                borderRadius: "20px",
                height: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: `${result.score}%`,
                  backgroundColor: getScoreColor(),
                  height: "100%",
                  borderRadius: "20px",
                  transition: "width 0.5s ease",
                }}
              />
            </div>

            <p><strong>{result.message}</strong></p>

            <h3>✅ Found Skills</h3>
            {result.foundSkills.map((skill, index) => (
              <span key={index} className="skill-badge found">
                {skill}
              </span>
            ))}

            <h3>❌ Missing Skills</h3>
            {result.missingSkills.map((skill, index) => (
              <span key={index} className="skill-badge missing">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
