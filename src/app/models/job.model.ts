import { Skill } from './skill.model';

export class Job {
  id: string;
  objective: string;
  skills: Skill[];
  skillX: string;
  organizationX: string;
  minAmount: number;
  maxAmount: number;

  constructor(job) {
    this.id = job.id;
    this.objective = job.objective;
    this.skills = job.skills;
    this.skillX = job.skillX;
    this.organizationX = job.organizationX;
  }
}
