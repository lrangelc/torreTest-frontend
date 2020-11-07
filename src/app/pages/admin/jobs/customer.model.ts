export class Customer {
  id: string;
  // taxId: string;
  name: string;
  taxName: string;
  taxId: string;
  serviceStatus: string;
  // address: string;
  // zipcode: number;
  // name: string;
  // phoneNumber: string;
  // mail: string;

  constructor(customer) {
    this.id = customer.taxName;
    // this.taxId = customer.taxId;
    // this.address = customer.address;
    this.name = customer.name;
    this.taxName = customer.taxName;
    this.taxId = customer.taxId;
    this.serviceStatus = customer.serviceStatus;
    // this.name = customer.name;
    // this.phoneNumber = customer.phoneNumber;
    // this.mail = customer.mail;
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
