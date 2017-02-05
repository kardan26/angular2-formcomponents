import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, forwardRef, Input } from '@angular/core';

@Component({
  selector: 'formctrl-select-single',
  templateUrl: './select-single.component.html',
  styleUrls: ['./select-single.component.scss'],
  providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectSingleComponent),
            multi: true
        }
  ]
})
export class SelectSingleComponent implements OnInit, ControlValueAccessor {
  @Input() displayElementsSeparator = ' ';
  @Input() displayElements: any[] = [];
  @Input() options: any[] = [];
  _value: any;
  set value(value: any) {
    this.propagateChange(value);
  }
  get value(): any {
    return this._value;
  }
  propagateChange = (_: any) => { };
  constructor() { }

  ngOnInit() {
  }

  writeValue(value: string) {
    if (value !== undefined && value !== null) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  toString(o: any) {
    let out: string = '';
    for (let dispEl of this.displayElements) {
      if ((<string>dispEl).split('.').length > 1) {
        let object = o;
        for (let prop of (<string>dispEl).split('.')) {
          object = object[prop];
          if (object === undefined) {
            throw new Error('formctrl-select-single -> Invalid display property : ' + dispEl);
          }
        }
        out += object + this.displayElementsSeparator;
      } else {
         out += o[dispEl] + this.displayElementsSeparator;
      }
    }
    return out;
  }

}
