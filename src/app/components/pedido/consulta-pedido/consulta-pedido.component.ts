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
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { ERROR, SUCCESS } from 'src/environments/environment';

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

    constructor(private pedidoService : PedidoService, private alertService: AlertService) {}

    ngOnInit():void {}

    consultarPedido(){
    try {
        this.pedidoService.findAllPedidoPorNomeCliente(this.nomeCliente).subscribe({
          next: (pedidos) => {
            this.pedidos = pedidos; 
            this.totalPedidos = pedidos.length;
        },
          error: (e) => this.errorMessage(e),
          complete: () => console.log('OK'),
        });
      }
      catch (error) {
        this.errorMessage(error);
      }
    }
  
    successMessage(result: any) {
      if (result) {
        this.alertMessage = {
          title: '',
          message: 'Operação Realizada Com Sucesso!',
          typeAlert: SUCCESS,
        };
        this.alertService.showGenericAlert(this.alertMessage);
      } else {
        this.errorMessage("Entre em contato com o Administrador do Sistema!");
      }
    }
  
    errorMessage(error: any) {
      console.log(error);
      this.alertMessage = {
        title: 'Ocorreu um erro ao tentar realizar a busca dos pedidos',
        message: error.error.message,
        typeAlert: ERROR,
      };
      this.alertService.showGenericAlert(this.alertMessage);
    }

    showModal(pedido: IPedido) {
        this.produtos = pedido.produtos!;
        this.totalProdutos = this.produtos.length;
        this.displayModal = true;
    }
}
