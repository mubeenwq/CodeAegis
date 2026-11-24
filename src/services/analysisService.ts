import { dashboardRiskTrend, mockAnalyses } from "@/data/mockAnalysis";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";
import { getRiskLabel } from "@/lib/utils";
import { AnalysisResult, AnalysisWizardPayload } from "@/types";

export const analysisService = {
  getAll(): AnalysisResult[] {
    return readStorage<AnalysisResult[]>(STORAGE_KEYS.ANALYSES, mockAnalyses);
  },

  getById(id: string): AnalysisResult | undefined {
    return this.getAll().find((a) => a.id === id) ?? mockAnalyses[0];
  },

  getRiskTrend() {
    return dashboardRiskTrend;
  },

  createSimulatedAnalysis(payload: AnalysisWizardPayload): AnalysisResult {
    const existing = this.getAll();
    const id = `ANL-${new Date().getFullYear()}-${String(existing.length + 85).padStart(3, "0")}`;
    const baseRisk = payload.engines.securityAnalysis ? 62 : 38;
    const simulated: AnalysisResult = {
      id,
      projectId: `proj-${payload.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      projectName: payload.projectName || "Untitled Prototype Project",
      date: new Date().toISOString().slice(0, 10),
      language: payload.language,
      architecture: payload.architecture,
      status: "Completed",
      overallRiskScore: baseRisk,
      riskLevel: getRiskLabel(baseRisk),
      totalVulnerabilities: 6,
      criticalFindings: 1,
      requirementCoverage: payload.requirements.length > 0 ? 85 : 100,
      architectureCompliance: 82,
      severityBreakdown: {
        critical: 1,
        high: 2,
        medium: 2,
        low: 1,
        informational: 0,
      },
      expectedComponents:
        payload.architecture === "MVC"
          ? ["Models", "Views", "Controllers"]
          : ["Domain", "Application", "Adapters", "Infrastructure"],
      detectedComponents: [
        { name: "Core Logic", files: Math.max(2, payload.files.length), compliant: true, notes: "Simulated structure check passed" },
        { name: "Boundary / API", files: 2, compliant: false, notes: "1 simulated layer boundary warning" },
      ],
      violations: [
        {
          id: "ARC-SIM-01",
          file: payload.files[0]?.name || "src/controller/main.ts",
          line: 28,
          layerExpected: `${payload.architecture} Boundary`,
          layerDetected: "Direct Data Access",
          description: "Simulated violation: direct persistence call detected outside repository boundary.",
          expectedResponsibility: "Delegate persistence to dedicated data-access layer.",
          suggestedCorrection: "Extract query logic into a repository service.",
          severity: "Medium",
        },
      ],
      riskFactors: [
        {
          factor: "Simulated Input Validation Gap",
          impact: 32,
          severity: "High",
          description: "Demonstration risk factor generated for prototype preview.",
        },
        {
          factor: "Module Complexity",
          impact: 20,
          severity: "Medium",
          description: "Simulated cyclomatic complexity indicator.",
        },
      ],
      highRiskFiles: [
        {
          file: payload.files[0]?.name || "src/index.ts",
          riskScore: baseRisk,
          complexity: 12,
          findings: 3,
          classification: "High Risk",
        },
      ],
      recommendations: [
        {
          id: "REC-SIM-01",
          title: "Add Schema Validation at Entry Points",
          priority: "High",
          relatedFindingId: "SEC-101",
          explanation: "Simulated recommendation: enforce strict DTO validation before business logic.",
          suggestedFix: "Validate incoming payloads with a typed schema validator.",
          securityTest: "Add negative test cases with malformed and oversized inputs.",
        },
      ],
      modelConfidence: 84,
      isSimulatedDemo: true,
    };

    writeStorage(STORAGE_KEYS.ANALYSES, [simulated, ...existing]);
    return simulated;
  },
};
