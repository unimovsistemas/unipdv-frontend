import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/templates/header/header.service';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit {
  productCode !: string;
  shoppingList : string[] = [];

  constructor(private headerService : HeaderService) {
      headerService.headerData = {
          title: 'Novo Pedido',
          routerUrl: 'pdv/pedido/listar'
      }
  }

  ngOnInit() {}

  addProductToList() {
      if (this.productCode) {
          this.shoppingList.push(this.productCode);
          this.productCode = '';
      }
  }

  clearShoppingList() {
      this.shoppingList = [];
  }

  finalizeOrder() { // Coloque aqui a lógica para finalizar o pedido
  }

}
