import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'fury-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  @Input() skills: string[] = [];
  allSkills: string[] = [
    'Backend Development',
    'Frontend Development',
    'Fullstack Development',
    'Software Development',
    'Communication',
    'Sales',
    'Marketing',
    'Management',
    'Customer Service',
    'Design',
    'Business',
    'Accounting',
    'Engineering',
    'Finance',
    'Data Science',
    'Healthcare',
    'Consulting',
    'Social Media',
  ];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredSkills = this.fruitCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allSkills.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.skills.indexOf(fruit);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
