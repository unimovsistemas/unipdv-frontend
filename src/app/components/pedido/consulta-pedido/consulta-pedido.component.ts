import {
    Component, Input, OnInit
}
from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAlert } from 'src/app/_interfaces/alert/iAlert';
import {
    IPedido
}
from 'src/app/_interfaces/pedido/i-pedido';
import { IprodutoOutput } from 'src/app/_interfaces/produto/iproduto-output';
import {
    PedidoService
}
from 'src/app/_services/pedido/pedido.service';

@Component({ selector: 'app-consulta-pedido', templateUrl: './consulta-pedido.component.html', styleUrls: ['./consulta-pedido.component.scss'] }) export class ConsultaPedidoComponent implements OnInit {

    nomeCliente: string = '';
    pedidos: IPedido[] = [];
    produtos: IprodutoOutput[] = [];
    totalPedidos: number = 0;
    totalProdutos: number = 0;
    displayModal: boolean = false;
    pedidoId!: string;
    alertMessage!: IAlert;
    form!: FormGroup;

    constructor(private pedidoService : PedidoService) {}

    ngOnInit():void {}

    consultarPedido() {
        this.pedidoService.findAllPedidoPorNomeCliente(this.nomeCliente)
        .subscribe(pedidos => { 
          this.pedidos = pedidos; 
          this.totalPedidos = pedidos.length; 
        });
    }

    showModal(pedido: IPedido) {
        this.produtos = pedido.produtos!;
        this.totalProdutos = this.produtos.length;
        this.displayModal = true;
    }
}
