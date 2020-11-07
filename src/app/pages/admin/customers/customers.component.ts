// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'fury-customers',
//   templateUrl: './customers.component.html',
//   styleUrls: ['./customers.component.scss']
// })
// export class CustomersComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomersService } from './../../../shared/services/customers.service';

@Component({
  selector: 'fury-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  coffees = [
    'Americano',
    'Flat White',
    'Cappuccino',
    'Latte',
    'Espresso',
    'Machiato',
    'Mocha',
    'Hot Chocolate',
    'Tea',
  ];

  coffeeOrder = [];

  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false),
  });
  businessID = '';

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.businessID = localStorage.getItem('businessID');
  }

  addCoffee(coffee): number {
    return this.coffeeOrder.push(coffee);
  }

  removeCoffee(coffee): void {
    const index = this.coffeeOrder.indexOf(coffee);
    if (index > -1) {
      this.coffeeOrder.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.customersService.form.value.coffeeOrder = this.coffeeOrder;
    const data = this.customersService.form.value;

    this.customersService
      .createCustomer('', data, this.businessID)
      .then((res) => {
        /*do something here....maybe clear the form or give a success message*/
      });
  }
}
