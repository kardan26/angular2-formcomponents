import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, forwardRef } from '@angular/core';

@Component({
  selector: 'formctrl-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
       {
           provide: NG_VALUE_ACCESSOR,
           useExisting: forwardRef(() => InputTextComponent),
           multi: true
       }
   ]
})
export class InputTextComponent implements OnInit, ControlValueAccessor {

  private _value: string;
  set value(value: string) {
    this.propagateChange(value);
  }
  get value() {
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

}
