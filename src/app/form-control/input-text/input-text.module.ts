import { FormsModule } from '@angular/forms';
import { InputTextComponent } from './input-text.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputTextComponent
  ],
  declarations: [InputTextComponent]
})
export class InputTextModule { }
