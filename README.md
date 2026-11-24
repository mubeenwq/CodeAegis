# 🛡️ CodeAegis
### From Intent to Prevent — Detect the Flaw, Defend the Intent.

**CodeAegis** is an AI-powered software engineering and cybersecurity framework developed as a Final Year Project (FYP). It bridges the gap between software requirements, architectural design, and actual source code implementation by combining requirement validation, design pattern verification, static security analysis, and machine learning-based risk prediction into a unified platform.

CodeAegis helps developers identify functional inconsistencies, architectural violations, security vulnerabilities, and high-risk code sections before deployment.

---

## 🎯 Project Objectives

CodeAegis aims to improve software quality and security throughout the software development lifecycle.

- **Requirement Validation:** Verify whether source code correctly implements the defined functional requirements and prevent requirement drift.
- **Architecture Compliance:** Evaluate source code structure against selected architectural patterns, such as MVC and Layered Architecture.
- **Security Analysis:** Identify potential vulnerabilities, insecure coding practices, and common software weaknesses at an early development stage.
- **Predictive Risk Assessment:** Use trained machine learning models to evaluate code metrics, predict security risks, and prioritize high-risk code sections.
- **Unified Analysis:** Integrate Software Engineering, Cybersecurity, and Machine Learning into a single intelligent analysis platform.

---

## ✨ Core Features

| Feature | Description |
|---|---|
| **Requirement-to-Code Validation** | Analyzes source code against functional requirements and identifies implemented, partially implemented, and missing features. |
| **Design Pattern Verification** | Examines code structure and checks compliance with selected architectural patterns such as MVC and Layered Architecture. |
| **Security Vulnerability Scanner** | Performs static security analysis to identify potential vulnerabilities and insecure coding practices. |
| **ML-Based Risk Prediction** | Uses trained machine learning classifiers and code metrics to predict and prioritize risky code sections. |
| **Intelligent Code Review** | Provides line-level evidence, contextual explanations, and recommended code improvements. |
| **Security Test Recommendations** | Suggests targeted security test cases based on identified vulnerabilities and weaknesses. |
| **Interactive Dashboard** | Presents analysis results, risk scores, vulnerability severity, and architecture compliance metrics. |
| **PDF Report Generation** | Generates downloadable reports containing findings, evidence, risk assessments, and remediation recommendations. |

---

## 🏛️ Three Core Pillars

CodeAegis integrates three major domains of software development:

### 1. Software Engineering
- Functional requirement validation.
- Requirement-to-code traceability.
- Design pattern verification.
- Architectural compliance analysis.
- Software quality assessment.

### 2. Cybersecurity
- Static vulnerability analysis.
- Insecure coding practice detection.
- Security weakness identification.
- Vulnerability severity assessment.
- Secure code recommendations.
- Targeted security test generation.

### 3. Machine Learning
- Code risk classification.
- Vulnerability prioritization.
- Code metric analysis.
- Predictive risk scoring.
- Model evaluation and performance monitoring.

---

## 🏗️ System Architecture

CodeAegis follows a multi-engine architecture in which software engineering rules, security analysis, and machine learning models work together to analyze uploaded software projects.

```text
                    ┌──────────────────────────┐
                    │     CodeAegis Platform   │
                    └────────────┬─────────────┘
                                 │
                    ┌────────────▼─────────────┐
                    │      Ingestion Layer     │
                    │                          │
                    │  • Software Requirements │
                    │  • Source Code Files     │
                    │  • Architecture Selection│
                    └────────────┬─────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
     ┌────────▼────────┐ ┌───────▼─────────┐ ┌──────▼──────────┐
     │ Software        │ │ Cybersecurity   │ │ Machine Learning│
     │ Engineering     │ │ Engine          │ │ Engine          │
     │ Engine          │ │                 │ │                 │
     │                 │ │ • Vulnerability │ │ • Risk          │
     │ • Requirement   │ │   Scanning      │ │   Prediction    │
     │   Validation    │ │ • Insecure Code │ │ • Risk Scoring  │
     │ • Architecture  │ │   Detection     │ │ • Prioritization│
     │   Verification  │ │ • Security Rules│ │ • Classification│
     └────────┬────────┘ └───────┬─────────┘ └──────┬──────────┘
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 │
                    ┌────────────▼─────────────┐
                    │   Analysis Aggregation   │
                    │                          │
                    │ • Findings               │
                    │ • Risk Assessment        │
                    │ • Compliance Results    │
                    └────────────┬─────────────┘
                                 │
                    ┌────────────▼─────────────┐
                    │    Output & Reporting    │
                    │                          │
                    │ • Line-Level Evidence    │
                    │ • Code Fix Suggestions  │
                    │ • Security Test Cases   │
                    │ • Interactive Dashboard │
                    │ • PDF Reports            │
                    └──────────────────────────┘
```

### Analysis Workflow

1. **Requirement Input:** Users provide functional requirements or software specifications.
2. **Source Code Upload:** Users upload their project source code or code package.
3. **Architecture Selection:** Users select the intended architectural pattern.
4. **Multi-Engine Analysis:** The Software Engineering and Cybersecurity engines analyze the uploaded project.
5. **ML Risk Assessment:** Machine learning models evaluate code metrics and prioritize potentially risky sections.
6. **Results Generation:** CodeAegis presents findings, explanations, suggested fixes, security tests, and downloadable reports.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Programming Language | Python |
| Machine Learning | Scikit-learn |
| Data Processing | Pandas, NumPy |
| Backend Framework | Python REST API |
| Frontend Framework | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Data Visualization | Recharts |
| Security Analysis | Static Analysis Tools, Custom Parsers |
| Code Analysis | AST Parsing, Code Metrics Extraction |
| Reporting | PDF Generation Engine |
| Version Control | Git, GitHub |

---

## 📁 Project Structure

The following represents the planned project organization:

```text
CodeAegis/
│
├── backend/
│   │
│   ├── engines/
│   │   ├── requirement_checker.py
│   │   ├── design_pattern_verifier.py
│   │   └── security_scanner.py
│   │
│   ├── ml_models/
│   │   ├── risk_predictor.py
│   │   ├── vulnerability_classifier.py
│   │   ├── model_loader.py
│   │   └── trained_weights/
│   │
│   ├── reports/
│   │   ├── pdf_generator.py
│   │   └── recommendation_engine.py
│   │
│   ├── tests/
│   │
│   └── app.py
│
├── frontend/
│   ├── public/
│   │
│   └── src/
│       ├── app/
│       ├── components/
│       ├── services/
│       ├── hooks/
│       ├── types/
│       └── data/
│
├── data/
│   ├── requirements/
│   ├── sample_code/
│   ├── raw_datasets/
│   └── processed_datasets/
│
├── docs/
│   ├── architecture/
│   ├── diagrams/
│   └── presentations/
│
├── requirements.txt
└── README.md
```

---

## 📊 Machine Learning & Dataset Strategy

CodeAegis uses supervised machine learning to support code risk assessment and vulnerability prioritization.

The training process involves collecting labeled software security examples, extracting relevant code metrics, preprocessing datasets, training classification models, and evaluating their performance.

### Planned Dataset Sources

| Dataset | Purpose |
|---|---|
| [NIST SARD](https://samate.nist.gov/SARD/) | Software weakness examples and security test cases. |
| [OWASP Benchmark](https://owasp.org/www-project-benchmark/) | Vulnerable and safe Java security test cases. |
| [CVEfixes](https://github.com/secureIT-project/CVEfixes) | Real-world vulnerable code and corresponding security fixes. |
| [BigVul](https://github.com/ZeoVan/MSR_20_Code_vulnerability_CSV_Dataset) | Vulnerability-related C/C++ code examples. |

### Planned Code Metrics

- Lines of Code (LOC).
- Cyclomatic Complexity.
- Number of Functions.
- Nesting Depth.
- Number of Parameters.
- Code Duplication.
- Input Validation Indicators.
- Dependency Information.
- Security-Related Code Indicators.

### Planned ML Models

- Code Risk Prediction Model.
- Vulnerability Classification Model.
- Code Quality Classification Model.

Model performance will be evaluated using:

- Accuracy.
- Precision.
- Recall.
- F1-Score.
- Confusion Matrix.

*Note: Dataset preparation, model training, and evaluation are part of the planned development process. Actual model results will be documented after implementation and testing.*

---

## ▶️ Installation & Setup

### Prerequisites

Ensure the following are installed:

- Python 3.10 or later.
- Node.js and npm.
- Git.
- A code editor such as Visual Studio Code.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CodeAegis.git

cd CodeAegis
```

### 2. Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
python backend/app.py
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

*Note: The backend commands will become applicable once the backend implementation is completed. The frontend prototype can be developed and run independently.*

---

## 🏗️ Building & Packaging

Before preparing a production build, ensure the following steps are completed:

1. Train and evaluate the machine learning models.
2. Store serialized model artifacts inside `backend/ml_models/trained_weights/`.
3. Configure the backend to load the trained models.
4. Integrate the frontend with the backend REST API.
5. Build the frontend production assets:

```bash
cd frontend
npm run build
```

6. Run backend tests:

```bash
pytest backend/tests/
```

7. Test the complete analysis workflow, including requirement validation, architecture verification, security scanning, and ML risk assessment.
8. Verify PDF report generation and deployment configuration.

---

## 🚀 Future Enhancements

Planned improvements for CodeAegis include:

- Support for additional programming languages.
- Expanded vulnerability detection capabilities.
- More architectural patterns and design verification rules.
- Improved requirement-to-code traceability.
- Enhanced ML-based risk prediction.
- Context-aware automated code remediation.
- Advanced security test case generation.
- Continuous integration and CI/CD pipeline integration.
- Historical project analysis and security trend tracking.

---

## 👥 Project Team

**Developed as a Final Year Project (FYP).**

| Team Member | SAP ID |
|---|---|
| Abis Ahmad | 61589 |
| Mubeen Zaman | 61586 |

---

## 📜 License

This project is developed for academic and educational purposes as a Final Year Project.

A formal open-source license can be added when the project distribution terms are finalized.

---

<p align="center">
  <strong>🛡️ CodeAegis — From Intent to Prevent.</strong>
  <br/>
  <em>Detect the Flaw, Defend the Intent.</em>
</p>
