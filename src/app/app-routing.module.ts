import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from './layouts/layout-default/layout-default.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginRegisterComponent } from './components/login/login-register/login-register.component';
/*import { AuthGuard } from './_services/guard/auth.guard';*/
import { ProdutoComponent } from './components/produto/produto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProdutoFormComponent } from './components/produto/produto-form/produto-form.component';
import { CategoriaFormComponent } from './components/categoria/categoria-form/categoria-form.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { HistoricoComponent } from './components/historico/historico/historico.component';
import { VendedorComponent } from './components/vendedor/vendedor.component';
import { VendedorFormComponent } from './components/vendedor/vendedor-form/vendedor-form.component';
import { PedidoComponent } from './components/pedido/pedido.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login/register',
    component: LoginRegisterComponent,
  },
  { 
    path: 'pdv',
    component: LayoutDefaultComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      // {
      //   path: '**',
      //   //component: PageNotFoundComponent,
      // },
      {
      path: 'produto/listar',
      component: ProdutoComponent,
      },
      {
        path: 'produto/cadastrar',
        component: ProdutoFormComponent,
      },
      {
        path: 'produto/atualizar/:id',
        component: ProdutoFormComponent,
      },
      {
        path: 'categoria/listar',
        component: CategoriaComponent,
      },
      {
        path: 'categoria/cadastrar',
        component: CategoriaFormComponent,
      },
      {
        path: 'categoria/atualizar/:id',
        component: CategoriaFormComponent
      },
      {
       path: 'estoque/listar',
       component: EstoqueComponent,
      },
      {
        path: 'historico/listar',
        component: HistoricoComponent,
       },
       {
        path: 'vendedor/listar',
        component: VendedorComponent,
       },
       {
        path: 'vendedor/cadastrar',
        component: VendedorFormComponent,
       },
       {
        path: 'vendedor/atualizar/:id',
        component: VendedorFormComponent,
       },
       {
        path: 'pedido/cadastrar',
        component: PedidoComponent,
       },
    ],
    /*canActivate: [AuthGuard]*/
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
