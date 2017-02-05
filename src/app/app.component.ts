import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      date: new FormControl(null, Validators.required),
      switch: new FormControl(true)
    });
  }

  dateChange(value) {
    console.log(value);
  }

}
