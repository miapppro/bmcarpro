import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatToolbarModule, MatIconModule,
    MatMenuModule, MatSidenavModule, MatRadioModule, MatInputModule, MatStepperModule,
    MatDividerModule, MatListModule, MatCardModule, MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSelectModule, MatFormFieldModule, MatPaginatorModule,
    MatSortModule, MatTableModule, MatDialogModule, MatDatepickerModule,
    MatSlideToggleModule, MatProgressSpinnerModule, MatProgressBarModule, MatBottomSheetModule,
    MatExpansionModule, MatButtonToggleModule, MatBadgeModule, MatAutocompleteModule,


    MatCheckboxModule,
    MatChipsModule,
    MatNativeDateModule, MatRippleModule,
    MatGridListModule,
    MatSliderModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatIconModule,
    MatMenuModule, MatSidenavModule, MatRadioModule, MatInputModule, MatStepperModule,
    MatDividerModule, MatListModule, MatCardModule, MatTabsModule,
    MatTooltipModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule, MatPaginatorModule,
    MatSortModule, MatTableModule, MatDialogModule, MatDatepickerModule,
    MatSlideToggleModule, MatProgressSpinnerModule, MatProgressBarModule, MatBottomSheetModule,
    MatExpansionModule, MatButtonToggleModule, MatBadgeModule, MatAutocompleteModule,


    MatCheckboxModule,
    MatChipsModule,
    MatNativeDateModule, MatRippleModule,
    MatGridListModule,
    MatSliderModule,
  ],
})
export class MaterialModule { }
