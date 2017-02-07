import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSearchComponent } from './select-search/select-search.component';
import { SelectSearchDropdownComponent } from './select-search-dropdown/select-search-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SelectSearchComponent, SelectSearchDropdownComponent
  ],
  declarations: [SelectSearchComponent, SelectSearchDropdownComponent]
})
export class SelectSearchModule { }
