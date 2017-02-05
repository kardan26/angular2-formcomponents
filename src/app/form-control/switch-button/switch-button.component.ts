import { FormcomponentsPage } from './../../../../e2e/app.po';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnInit, Input, Output, EventEmitter, Component, forwardRef } from '@angular/core';
@Component({
    selector: 'formctrl-switch-button',
    templateUrl: './switch-button.component.html',
    styleUrls: ['./switch-button.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SwitchButtonComponent),
            multi: true
        }
    ]
})
export class SwitchButtonComponent implements ControlValueAccessor {

    private _value: boolean;
    public get value(): boolean {
        return this._value;
    }
    public set value(v: boolean) {
        this._value = v;
        this.propagateChange(v);
    }
    propagateChange = (_: any) => { };
    writeValue(value: any) {
        if (value !== undefined) {
            this.value = value;
            this.propagateChange(this.value);
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {

    }

    toogle(event) {
        this.value = event.target.checked;
    }
}
