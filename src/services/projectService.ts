import { mockProjects } from "@/data/mockProjects";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";
import { Project } from "@/types";

export const projectService = {
  getAll(): Project[] {
    return readStorage<Project[]>(STORAGE_KEYS.PROJECTS, mockProjects);
  },

  getById(id: string): Project | undefined {
    return this.getAll().find((p) => p.id === id);
  },

  saveAll(projects: Project[]): void {
    writeStorage(STORAGE_KEYS.PROJECTS, projects);
  },

  create(project: Omit<Project, "id" | "createdAt">): Project {
    const existing = this.getAll();
    const created: Project = {
      ...project,
      id: `proj-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    this.saveAll([created, ...existing]);
    return created;
  },

  remove(id: string): Project[] {
    const updated = this.getAll().filter((p) => p.id !== id);
    this.saveAll(updated);
    return updated;
  },
};
