import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from "@angular/platform-browser";
import { AccordionModule } from "primeng/accordion";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { ImageModule } from "primeng/image";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { PaginatorModule } from "primeng/paginator";
import { PasswordModule } from "primeng/password";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CategoriaFormComponent } from "./components/categoria/categoria-form/categoria-form.component";
import { CategoriaComponent } from "./components/categoria/categoria.component";
import { EstoqueComponent } from "./components/estoque/estoque.component";
import { HomeCreateComponent } from "./components/home-create/home-create.component";
import { LoginRegisterComponent } from "./components/login/login-register/login-register.component";
import { LoginComponent } from "./components/login/login.component";
import { ProdutoFormComponent } from "./components/produto/produto-form/produto-form.component";
import { ProdutoComponent } from "./components/produto/produto.component";
import { HomeComponent } from "./views/home/home.component";
import { AuthService } from "./_services/auth/auth.service";
import { DashboardService } from "./_services/dashboard/dashboard.service";
import { TokenInterceptor } from "./_services/interceptor/token.interceptor";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableModule } from "primeng/table";
import { Location, CommonModule } from '@angular/common';
import { LayoutDefaultModule } from "./layouts/layout-default/layout-default.module";
import { HistoricoComponent } from './components/historico/historico/historico.component';
import { VendedorComponent } from './components/vendedor/vendedor.component';
import { VendedorFormComponent } from './components/vendedor/vendedor-form/vendedor-form.component';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import { PedidoComponent } from './components/pedido/pedido.component';
import { MatSortModule } from "@angular/material";
import { SidebarModule } from "primeng/sidebar";
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { PedidoFormComponent } from './components/pedido/pedido-form/pedido-form.component';
import { ConsultaPedidoComponent } from './components/pedido/consulta-pedido/consulta-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCreateComponent,
    HomeComponent,
    LoginComponent,
    LoginRegisterComponent,
    ProdutoComponent,
    CategoriaComponent,
    ProdutoFormComponent,
    CategoriaFormComponent,
    EstoqueComponent,
    HistoricoComponent,
    VendedorComponent,
    VendedorFormComponent,
    PedidoComponent,
    PedidoFormComponent,
    ConsultaPedidoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccordionModule,
    MessagesModule,
    MessageModule,
    LayoutDefaultModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageModule,
    InputMaskModule,
    CheckboxModule,
    ConfirmPopupModule,
    DialogModule,
    PasswordModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    CheckboxModule,
    InputMaskModule,
    PaginatorModule,
    TableModule,
    CommonModule,
    DialogModule,
    StepsModule,
    ToastModule,
    CardModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    SidebarModule,
    BreadcrumbModule,    
  ],
  providers: [
    Location,
    AuthService,
    DashboardService,
    ReactiveFormsModule,
    CheckboxModule,
    InputMaskModule,
    HttpClientModule,
    FormsModule,
    HttpClient,
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
