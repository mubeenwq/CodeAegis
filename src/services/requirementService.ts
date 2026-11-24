import { mockRequirements } from "@/data/mockRequirements";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";
import { Requirement } from "@/types";

export const requirementService = {
  getAll(): Requirement[] {
    return readStorage<Requirement[]>(STORAGE_KEYS.REQUIREMENTS, mockRequirements);
  },

  getByProject(projectId: string): Requirement[] {
    return this.getAll().filter((r) => r.projectId === projectId);
  },

  saveAll(requirements: Requirement[]): void {
    writeStorage(STORAGE_KEYS.REQUIREMENTS, requirements);
  },

  create(req: Requirement): Requirement[] {
    const updated = [req, ...this.getAll()];
    this.saveAll(updated);
    return updated;
  },

  update(req: Requirement): Requirement[] {
    const updated = this.getAll().map((item) => (item.id === req.id ? req : item));
    this.saveAll(updated);
    return updated;
  },

  remove(id: string): Requirement[] {
    const updated = this.getAll().filter((item) => item.id !== id);
    this.saveAll(updated);
    return updated;
  },
};
