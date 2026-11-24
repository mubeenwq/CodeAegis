import { mockReports } from "@/data/mockReports";
import { downloadTextFile } from "@/lib/utils";
import { ReportItem } from "@/types";

export const reportService = {
  getAll(): ReportItem[] {
    return mockReports;
  },

  exportCsv(report: ReportItem): void {
    const csv = [
      "Report ID,Title,Type,Project,Analysis ID,Generated At,Risk Score,Findings Count",
      `${report.id},"${report.title}",${report.type},"${report.projectName}",${report.analysisId},${report.generatedAt},${report.riskScore},${report.findingsCount}`,
    ].join("\n");
    downloadTextFile(`${report.id.toLowerCase()}.csv`, csv, "text/csv;charset=utf-8");
  },

  exportDemoReportText(report: ReportItem): void {
    const content = [
      "CODEAEGIS - DEMONSTRATION SECURITY & ENGINEERING REPORT",
      "=======================================================",
      `Report ID: ${report.id}`,
      `Title: ${report.title}`,
      `Type: ${report.type}`,
      `Project: ${report.projectName}`,
      `Analysis Reference: ${report.analysisId}`,
      `Generated At: ${report.generatedAt}`,
      `Overall Risk Score (Simulated): ${report.riskScore}/100`,
      `Findings Count: ${report.findingsCount}`,
      "",
      "NOTE: This is a frontend prototype demonstration report.",
      "Live scanning and ML inference will be connected in the backend phase.",
    ].join("\n");
    downloadTextFile(`${report.id.toLowerCase()}-demo-report.txt`, content, "text/plain;charset=utf-8");
  },
};
