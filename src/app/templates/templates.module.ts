import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarModule} from 'primeng/sidebar';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    BreadcrumbModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent
  ]
})
export class TemplatesModule { }
