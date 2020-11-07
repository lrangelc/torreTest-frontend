import { Skill } from './skill.model';

export class Job {
  id: string;
  // taxId: string;
  objective: string;
  skills: Skill[];
  // taxName: string;
  // taxId: string;
  // serviceStatus: string;

  // address: string;
  // zipcode: number;
  // name: string;
  // phoneNumber: string;
  // mail: string;

  constructor(job) {
    this.id = job.id;
    // this.taxId = job.taxId;
    // this.address = job.address;
    this.objective = job.objective;
    this.skills = job.skills;
    // this.taxName = job.taxName;
    // this.taxId = job.taxId;
    // this.serviceStatus = job.serviceStatus;

    // this.name = job.name;
    // this.phoneNumber = job.phoneNumber;
    // this.mail = job.mail;
  }

  // get name() {
  //   let name = '';

  //   if (this.firstName && this.lastName) {
  //     name = this.firstName + ' ' + this.lastName;
  //   } else if (this.firstName) {
  //     name = this.firstName;
  //   } else if (this.lastName) {
  //     name = this.lastName;
  //   }

  //   return name;
  // }

  // set name(value) {
  // }

  // get address() {
  //   return `${this.street}, ${this.zipcode} ${this.city}`;
  // }

  // set address(value) {
  // }
}
