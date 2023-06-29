import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MATERIAL
import { MaterialModule } from './material/material.module';

// SELECT
import { NgSelectModule } from '@ng-select/ng-select';


// FLEX RESPONSIVE
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgSelectModule,
  ],
  exports: [
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgSelectModule,
  ],
})
export class HerramientasModule { }
