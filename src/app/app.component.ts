import { User, Location } from './app.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  dispElem = [
    'firstName',
    'lastName',
    'location.x'
  ];

  users: User[] = [
    {
      id: 1,
      firstName: 'FirstName',
      lastName: 'LastName',
      age: 18,
      location: {
        x: '15.15',
        y: '54.45',
      }
    },
    {
      id: 2,
      firstName: 'FirstName2',
      lastName: 'LastName2',
      age: 18,
      location: {
        x: '95.18',
        y: '48.32',
      }
    }
  ];
  users2: any[] = [
    {
      label: 'daniel',
      value: 'daniel'
    },
    {
      label: 'kamil',
      value: 'kamil'
    },
    {
      label: 'jarek',
      value: 'jarek'
    },
    {
      label: 'andrzej',
      value: 'andrzej'
    }
  ];

  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      date: new FormControl(null, Validators.required),
      text: new FormControl('', Validators.required),
      switch: new FormControl(true),
      selectsingle: new FormControl(this.users[1], Validators.required),
      selectsearch: new FormControl('daniel', Validators.required)
    });
  }

  dateChange(value) {
    console.log(value);
  }

  log(data) {
    console.log(data);
  }
}
