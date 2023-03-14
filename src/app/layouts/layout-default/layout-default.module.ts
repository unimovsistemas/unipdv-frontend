import { TemplatesModule } from './../../templates/templates.module';
import { RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from './layout-default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    LayoutDefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TemplatesModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
    DialogModule
  ],
  exports: [
  ],
  providers: [ConfirmationService]

})
export class LayoutDefaultModule { }
