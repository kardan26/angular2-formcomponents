import { FormsModule } from '@angular/forms';
import { SwitchButtonComponent } from './switch-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SwitchButtonComponent
  ],
  exports: [
    SwitchButtonComponent
  ]
})
export class SwitchButtonModule { }
