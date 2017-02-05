import { SwitchButtonComponent } from './switch-button/switch-button.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InputTextComponent } from './input-text/input-text.component';
import { SelectSingleComponent } from './select-single/select-single.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [DatepickerComponent, SwitchButtonComponent, InputTextComponent, SelectSingleComponent],
  exports: [DatepickerComponent, SwitchButtonComponent, InputTextComponent, SelectSingleComponent]
})
export class FormControlModule { }
