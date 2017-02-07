import { FormsModule } from '@angular/forms';
import { SelectSingleComponent } from './select-single.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SelectSingleComponent
  ],
  declarations: [SelectSingleComponent]
})
export class SelectSingleModule { }
