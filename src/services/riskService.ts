import { mockAnalyses } from "@/data/mockAnalysis";
import { projectService } from "@/services/projectService";

export const riskService = {
  getRiskOverview() {
    const projects = projectService.getAll();
    const avgRisk =
      projects.length > 0
        ? Math.round(projects.reduce((acc, p) => acc + p.riskScore, 0) / projects.length)
        : 0;

    return {
      averageRiskScore: avgRisk,
      highRiskFiles: mockAnalyses.flatMap((a) => a.highRiskFiles),
      riskFactors: mockAnalyses[0]?.riskFactors ?? [],
      distribution: [
        { name: "Low Risk", value: projects.filter((p) => p.riskScore < 30).length || 2 },
        { name: "Medium Risk", value: projects.filter((p) => p.riskScore >= 30 && p.riskScore < 65).length || 2 },
        { name: "High Risk", value: projects.filter((p) => p.riskScore >= 65).length || 2 },
      ],
    };
  },
};
