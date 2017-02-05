import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker/datepicker.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [DatepickerComponent],
  exports: [DatepickerComponent]
})
export class FormControlModule { }
