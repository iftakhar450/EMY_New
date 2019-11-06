import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// materials
import { MatFormFieldModule, MatInputModule, MatTableModule } from '@angular/material';
import { MatButtonModule, MatMenuModule, MatSidenavModule } from '@angular/material';
 import {MatIconModule} from '@angular/material/icon';
 import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DropdownComponent } from '../dropdown/dropdown.component';
import {DataTableModule} from 'angular-6-datatable';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventPipe } from 'src/app/Pipes/event/event.pipe';
import { SearchPipe } from 'src/app/Pipes/search/search.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DateFormatPipe } from 'src/app/Pipes/dateFormat/date-format.pipe';
import { ExportAsModule } from 'ngx-export-as';
// import { PdfMakeWrapper } from 'pdfmake-wrapper';
// import { PdfmakeModule } from 'ng-pdf-make';PdfMakeWrapper
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    DataTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgDatepickerModule,
    ExportAsModule,
    // PdfMakeWrapper
    // PdfmakeModule
  ],
  declarations: [
    HeaderComponent,
    DropdownComponent,
    EventPipe,
    SearchPipe,
    DateFormatPipe

  ],
  exports: [
    HeaderComponent,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    DropdownComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    DataTableModule,
    CalendarModule,
    EventPipe,
    SearchPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    NgDatepickerModule,
    DateFormatPipe,
    ExportAsModule,
    // PdfMakeWrapper
    // PdfmakeModule
  ]
})
export class SharedModule { }
