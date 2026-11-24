🛡️ CodeAegis
An intelligent framework for software requirement validation, design pattern compliance, predictive security risk scoring, and automated vulnerability detection — built as a Final Year Project[cite: 1].
An AI-powered platform that analyzes source code against functional requirements, architectural design patterns, coding standards, and security practices to catch critical flaws before deployment[cite: 1].

🎯 Core Purpose
- Validates source code against original software requirements to prevent requirement drift[cite: 1].
- Verifies architectural compliance against selected design patterns (e.g., MVC, Layered)[cite: 1].
- Detects security vulnerabilities and insecure coding practices early in the development lifecycle[cite: 1].
- Predicts and prioritizes high-risk code sections using trained machine learning models[cite: 1].
- Connects Software Engineering, Cybersecurity, and Machine Learning into a single unified analysis platform[cite: 1].

✨ Features
- Requirement-to-Code Validation: Automated mapping of code implementations to specified functional requirements[cite: 1].
- Design Pattern & Architectural Verification: Automated structural checking against selected design patterns[cite: 1].
- Security Vulnerability Scanner: Early static security scanning for vulnerabilities and bad coding practices[cite: 1].
- ML-Based Risk Prediction: Machine learning classifiers that evaluate code metrics and rank code sections by risk severity[cite: 1].
- Intelligent Code Review: Line-by-line code evidence, contextual explanations, and AI-recommended code fixes[cite: 1].
- Security Test Recommendations: Automated suggestions for specific security test cases tailored to detected flaws[cite: 1].
- Interactive Dashboard & PDF Reports: Real-time risk scoring, severity ratings, and downloadable single-file executive reports[cite: 1].

🛠️ Tech Stack
| Category | Tool / System |
| :--- | :--- |
| Core Language | Python |
| ML & Data Science | Scikit-learn, Pandas, NumPy |
| Security Scanning | Static Analysis Tools & Custom Parsers[cite: 1] |
| Web Backend | Python (RESTful Web Service / Integration API) |
| Web Frontend | Interactive Analysis Dashboard[cite: 1] |
| Reporting Engine | PDF Export Engine & Report Generator[cite: 1] |

🏗️ Architecture
The project follows a multi-engine analysis architecture combining software engineering rules, static analysis, and machine learning models[cite: 1]:

CodeAegis Core Platform
    ├── Ingestion Layer        → Software Requirements + Source Code + Design Pattern Selection[cite: 1]
    │
    ├── SE Engine              → Requirement Validation & Design Pattern Conformance[cite: 1]
    ├── Cybersecurity Engine   → Static Vulnerability Scanning & Insecure Code Analysis[cite: 1]
    ├── Machine Learning Engine → Trained Classifiers for Risk Scoring & Flaw Prioritization[cite: 1]
    │
    └── Output & Reporting     → Line-Level Evidence, Fix Suggestions, Security Tests & PDF Reports[cite: 1]

📁 Project Structure
CodeAegis/
├── backend/
│   ├── engines/           (requirement_checker.py, design_pattern_verifier.py, security_scanner.py)
│   ├── ml_models/         (risk_predictor.py, model_loader.py, trained_weights/)
│   ├── reports/            (pdf_generator.py, recommendation_engine.py)
│   └── app.py              (REST API server)
├── frontend/
│   ├── public/
│   └── src/                (Dashboard components, Upload forms, Report viewer)
├── data/
│   ├── requirements/       (Sample requirements / SRS files)
│   └── sample_code/        (Test source code packages)
├── docs/                   (Presentation slides, Architecture diagrams)
└── requirements.txt        (Python dependency manifest)

▶️ How to Run
1. Clone this repository
2. Install dependencies:
   pip install -r requirements.txt
3. Start the backend service:
   python backend/app.py
4. Launch the web dashboard (or open local interface):
   npm start
5. Upload your Software Requirements, Source Code package, and select your Design Pattern to execute analysis[cite: 1].

🏗️ Building & Packaging
1. Ensure all machine learning model artifacts are serialized and stored under `backend/ml_models/`[cite: 1].
2. Build the frontend production assets:
   cd frontend && npm run build
3. Run integration tests across test source packages:
   pytest backend/tests/
4. Launch the consolidated web production service.
