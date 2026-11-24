import { mockFindings } from "@/data/mockFindings";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";
import { FindingStatus, SecurityFinding } from "@/types";

export const securityService = {
  getAll(): SecurityFinding[] {
    return readStorage<SecurityFinding[]>(STORAGE_KEYS.FINDINGS, mockFindings);
  },

  getByAnalysis(analysisId: string): SecurityFinding[] {
    const all = this.getAll();
    const matched = all.filter((f) => f.analysisId === analysisId);
    return matched.length > 0 ? matched : all.slice(0, 3);
  },

  updateStatus(id: string, status: FindingStatus): SecurityFinding[] {
    const updated = this.getAll().map((f) => (f.id === id ? { ...f, status } : f));
    writeStorage(STORAGE_KEYS.FINDINGS, updated);
    return updated;
  },
};
