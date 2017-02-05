import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  date: Date;
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      control: new FormControl('', Validators.required)
    });
    this.date = null;
    console.log(this.date);
  }

  dateChange(value) {
    console.log(value);
  }

}
