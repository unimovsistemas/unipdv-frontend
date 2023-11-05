import {
    Component, Input, OnInit
}
from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IAlert } from 'src/app/_interfaces/alert/iAlert';
import {
    IPedido, IPedidoInput
}
from 'src/app/_interfaces/pedido/i-pedido';
import { IprodutoOutput } from 'src/app/_interfaces/produto/iproduto-output';
import {
    PedidoService
}
from 'src/app/_services/pedido/pedido.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { ERROR, ROTA_LISTA_PEDIDOS, ROTA_LISTA_PRODUTOS, SUCCESS } from 'src/environments/environment';

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

    constructor(private pedidoService : PedidoService, private alertService: AlertService, private redirectRouter : Router) {}

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

    concluirVenda(pedido: IPedidoInput) {
      try {
        this.pedidoService.concluirVenda(pedido).subscribe({
          next: (v) => this.messagePut(v),
          error: (e) => this.messageErrorPut(),
          complete: () => this.redirectRouter.navigate([ROTA_LISTA_PEDIDOS]),
        });
      } catch (error) {
        this.messageErrorPost();
        return false;
      }
  
      return true;
  }

  messagePut(result: any) {
    if (result) {
      this.alertMessage = {
        title: '',
        message: 'Venda concluída com sucesso!',
        typeAlert: SUCCESS,
      };
      this.alertService.showGenericAlert(this.alertMessage);
    } else {
      this.messageErrorPut();
    }
  }

  messageErrorPut() {
    this.alertMessage = {
      title: 'Ocorreu um erro ao concluir a venda',
      message: 'Entre em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  messageErrorPost() {
    this.alertMessage = {
      title: 'Ocorreu um erro concluir a venda',
      message: 'Entre em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }
}
