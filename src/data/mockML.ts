import { MLDatasetOverview, MLModelInfo } from "@/types";

export const mockMLModels: MLModelInfo[] = [
  {
    id: "ml-risk-pred",
    name: "Code Risk Prediction Model",
    algorithm: "XGBoost + AST Structural Features",
    status: "Prototype / Sample Metrics",
    datasetName: "CodeAegis-VulnBench v0.9 (Sample)",
    trainingSamples: 24500,
    accuracy: 91.4,
    precision: 89.8,
    recall: 92.6,
    f1Score: 91.2,
    description:
      "Predicts module-level risk scores (0–100) from cyclomatic complexity, nesting depth, and taint-flow indicators.",
  },
  {
    id: "ml-vuln-cls",
    name: "Vulnerability Classification Model",
    algorithm: "CodeBERT Fine-Tuned Classifier",
    status: "Prototype / Sample Metrics",
    datasetName: "CWE-MultiLang-Corpus (Sample)",
    trainingSamples: 38200,
    accuracy: 88.7,
    precision: 87.9,
    recall: 86.4,
    f1Score: 87.1,
    description:
      "Classifies suspicious code blocks into CWE categories (SQLi, XSS, Path Traversal, Hardcoded Secrets).",
  },
  {
    id: "ml-quality-pred",
    name: "Code Quality Prediction Model",
    algorithm: "Random Forest Ensemble",
    status: "Awaiting Training",
    datasetName: "ArchCompliance-Metrics (Sample)",
    trainingSamples: 15800,
    accuracy: 85.2,
    precision: 84.1,
    recall: 86.0,
    f1Score: 85.0,
    description:
      "Estimates maintainability degradation and architectural drift risk across multi-file commits.",
  },
];

export const mockMLDataset: MLDatasetOverview = {
  totalSamples: 78500,
  vulnerableSamples: 29400,
  safeSamples: 49100,
  categories: [
    { name: "SQL Injection (CWE-89)", count: 6850, percentage: 23.3 },
    { name: "Cross-Site Scripting (CWE-79)", count: 6120, percentage: 20.8 },
    { name: "Hardcoded Credentials (CWE-798)", count: 4940, percentage: 16.8 },
    { name: "Path Traversal (CWE-22)", count: 4180, percentage: 14.2 },
    { name: "Insecure Auth (CWE-287/307)", count: 3910, percentage: 13.3 },
    { name: "Insecure Deserialization (CWE-502)", count: 3400, percentage: 11.6 },
  ],
};

export const mockConfusionMatrix = {
  labels: ["Safe Code", "Low/Med Risk", "High/Critical"],
  matrix: [
    [4120, 210, 45],
    [185, 2480, 195],
    [38, 162, 2565],
  ],
};
