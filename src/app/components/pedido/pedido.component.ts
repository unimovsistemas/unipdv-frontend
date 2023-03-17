import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import { HeaderService } from 'src/app/templates/header/header.service';
import {ProdutoService} from 'src/app/_services/produto/produto.service';

@Component({selector: 'app-pedido', templateUrl: './pedido.component.html', styleUrls: ['./pedido.component.scss']})
export class PedidoComponent implements OnInit {

    productCode !: string;
    shoppingList : string[] = [];

    constructor(private headerService : HeaderService) {
        headerService.headerData = {
            title: 'Pedidos',
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
