import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, forwardRef, Input, AfterViewInit } from '@angular/core';

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
export class SelectSingleComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() displayElementsSeparator = ' ';
  @Input() displayElements: any[] = [];
  @Input() noSelectionText = '';
  // AVAILABLE OPTIONS
  parsedOptions: Option[] = [];
  _options: any[] = [];
  @Input()
  set options(options: any[]) {
    options.forEach(o => {
      this.parsedOptions.push(new Option(
        this.getObjectLabel(o),
        this.getObjectValue(o)
      ));
    });
  }
  // STRING SELECT VALUE
  _value: string = null;
  set value(value: string) {
    const parsedObject = JSON.parse(value);
    this.propagateChange(parsedObject);
    this._value = value;
  }
  get value() {
    return this._value;
  }
  // INTERNAL SELECTED VALUE
  _selected: Option = null;
  set selected(selected: Option) {
    this._selected = selected;
  }
  get selected() {
    return this._selected;
  }
  // SELECTED OBJECT
  _objectValue: any = null;
  set objectValue(value: any) {
    console.log('object value');
    console.log(value);
    this._objectValue = value;
  }
  get objectValue() {
    return this._objectValue;
  }

  propagateChange = (_: any) => { };
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.objectValue) {
      setTimeout(() => {
        const parsedOption = new Option(this.getObjectLabel(this.objectValue),
        this.getObjectValue(this.objectValue));
        this.parsedOptions.forEach(o => {
          if (o.equals(parsedOption)) {
            this.selected = o;
            this.value = o.value;
          }
        });
      });
    }
  }

  writeValue(value: any) {
    this.objectValue = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  getObjectLabel(o: any) {
    let out = '';
    for (const dispEl of this.displayElements) {
      if ((<string>dispEl).split('.').length > 1) {
        let object = o;
        for (const prop of (<string>dispEl).split('.')) {
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

  getObjectValue(o): string {
    return JSON.stringify(o);
  }
}

class Option {
  label: string;
  value: string;
  equals(o: Option): boolean {
    if (this.label === o.label && this.value === o.value) {
      return true;
    }
    return false;
  }
  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
}
