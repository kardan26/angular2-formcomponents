import { SelectSearchModule } from './select-search/select-search.module';
import { SwitchButtonModule } from './switch-button/switch-button.module';
import { SelectSingleModule } from './select-single/select-single.module';
import { InputTextModule } from './input-text/input-text.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { SwitchButtonComponent } from './switch-button/switch-button.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InputTextComponent } from './input-text/input-text.component';
import { SelectSingleComponent } from './select-single/select-single.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DatepickerModule,
    InputTextModule,
    SelectSingleModule,
    SwitchButtonModule,
    SelectSearchModule
  ],
  exports: [
    DatepickerModule,
    InputTextModule,
    SelectSingleModule,
    SwitchButtonModule,
    SelectSearchModule
  ]
})
export class FormControlModule { }
