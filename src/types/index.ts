export type ProgrammingLanguage =
  | "Python"
  | "Java"
  | "JavaScript"
  | "TypeScript"
  | "PHP"
  | "C"
  | "C++"
  | "C#";

export type ProjectType =
  | "Web Application"
  | "Desktop Application"
  | "Mobile Application"
  | "API / Backend"
  | "Other";

export type ArchitecturePattern =
  | "MVC"
  | "Layered"
  | "Three-Tier"
  | "Clean"
  | "Microservices"
  | "Custom";

export type SeverityLevel =
  | "Critical"
  | "High"
  | "Medium"
  | "Low"
  | "Informational";

export type FindingStatus =
  | "Open"
  | "In Progress"
  | "Fixed"
  | "Accepted Risk";

export type RequirementCategory =
  | "Functional"
  | "Non-Functional"
  | "Security"
  | "Performance"
  | "Usability";

export type RequirementPriority = "Critical" | "High" | "Medium" | "Low";

export type RequirementStatus =
  | "Implemented"
  | "Partially Implemented"
  | "Missing";

export type ProjectStatus =
  | "Secure"
  | "Attention Needed"
  | "Critical"
  | "Pending";

export interface Project {
  id: string;
  name: string;
  description: string;
  language: ProgrammingLanguage;
  projectType: ProjectType;
  architecture: ArchitecturePattern;
  lastAnalysisDate: string;
  latestAnalysisId: string;
  status: ProjectStatus;
  riskScore: number;
  requirementCoverage: number;
  architectureCompliance: number;
  findingsCount: number;
  filesCount: number;
  createdAt: string;
}

export interface RequirementEvidence {
  file: string;
  lineStart: number;
  lineEnd: number;
  snippet: string;
}

export interface Requirement {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  category: RequirementCategory;
  priority: RequirementPriority;
  status: RequirementStatus;
  matchScore: number;
  matchedFiles: string[];
  matchedFunctions: string[];
  evidence: RequirementEvidence[];
}

export interface SecurityFinding {
  id: string;
  analysisId: string;
  projectId: string;
  projectName: string;
  title: string;
  category: string;
  cwe: string;
  file: string;
  line: number;
  severity: SeverityLevel;
  status: FindingStatus;
  explanation: string;
  impact: string;
  vulnerableCode: string;
  secureCode: string;
  remediationSteps: string[];
  recommendedTests: string[];
  detectedAt: string;
}

export interface ArchitectureViolation {
  id: string;
  file: string;
  line: number;
  layerExpected: string;
  layerDetected: string;
  description: string;
  expectedResponsibility: string;
  suggestedCorrection: string;
  severity: "High" | "Medium" | "Low";
}

export interface DetectedComponent {
  name: string;
  files: number;
  compliant: boolean;
  notes: string;
}

export interface RiskFactor {
  factor: string;
  impact: number;
  severity: "High" | "Medium" | "Low";
  description: string;
}

export interface HighRiskFile {
  file: string;
  riskScore: number;
  complexity: number;
  findings: number;
  classification: "High Risk" | "Medium Risk" | "Low Risk";
}

export interface RecommendationItem {
  id: string;
  title: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  relatedFindingId: string;
  explanation: string;
  suggestedFix: string;
  securityTest: string;
}

export interface AnalysisResult {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  language: ProgrammingLanguage;
  architecture: ArchitecturePattern;
  status: "Completed" | "Running" | "Failed";
  overallRiskScore: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  totalVulnerabilities: number;
  criticalFindings: number;
  requirementCoverage: number;
  architectureCompliance: number;
  severityBreakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    informational: number;
  };
  expectedComponents: string[];
  detectedComponents: DetectedComponent[];
  violations: ArchitectureViolation[];
  riskFactors: RiskFactor[];
  highRiskFiles: HighRiskFile[];
  recommendations: RecommendationItem[];
  modelConfidence: number;
  isSimulatedDemo: boolean;
}

export interface MLModelInfo {
  id: string;
  name: string;
  algorithm: string;
  status: "Prototype / Sample Metrics" | "Awaiting Training";
  datasetName: string;
  trainingSamples: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  description: string;
}

export interface MLDatasetOverview {
  totalSamples: number;
  vulnerableSamples: number;
  safeSamples: number;
  categories: { name: string; count: number; percentage: number }[];
}

export interface ReportItem {
  id: string;
  title: string;
  type:
    | "Analysis Report"
    | "Project Report"
    | "Security Report"
    | "Architecture Compliance"
    | "Requirement Traceability";
  projectId: string;
  projectName: string;
  analysisId: string;
  generatedAt: string;
  riskScore: number;
  findingsCount: number;
  format: "PDF" | "CSV";
}

export interface UserSettings {
  fullName: string;
  email: string;
  role: string;
  organization: string;
  defaultArchitecture: ArchitecturePattern;
  defaultLanguage: ProgrammingLanguage;
  autoRunML: boolean;
  emailAlerts: boolean;
  criticalSlackAlerts: boolean;
  weeklyDigest: boolean;
  compactTables: boolean;
}

export interface WizardRequirementDraft {
  id: string;
  description: string;
  priority: RequirementPriority;
}

export interface WizardUploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "Ready" | "Validated";
}

export interface AnalysisWizardPayload {
  projectName: string;
  projectDescription: string;
  language: ProgrammingLanguage;
  projectType: ProjectType;
  requirements: WizardRequirementDraft[];
  files: WizardUploadedFile[];
  architecture: ArchitecturePattern;
  engines: {
    requirementValidation: boolean;
    architectureVerification: boolean;
    securityAnalysis: boolean;
    mlRiskAssessment: boolean;
  };
}
