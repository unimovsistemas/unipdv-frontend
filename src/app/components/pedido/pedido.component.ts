import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/templates/header/header.service';
import { IAlert } from 'src/app/_interfaces/alert/iAlert';
import { IPedido, IPedidoInput } from 'src/app/_interfaces/pedido/i-pedido';
import { IprodutoInput } from 'src/app/_interfaces/produto/iproduto-input';
import { IprodutoOutput } from 'src/app/_interfaces/produto/iproduto-output';
import { PedidoService } from 'src/app/_services/pedido/pedido.service';
import {ProdutoService} from 'src/app/_services/produto/produto.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { ERROR, ROTA_LISTA_PEDIDOS, SUCCESS } from 'src/environments/environment';

@Component({selector: 'app-pedido', templateUrl: './pedido.component.html', styleUrls: ['./pedido.component.scss']})
export class PedidoComponent implements OnInit {

    pedidos: IPedido[] = [];
    produtos: IprodutoOutput[] = [];
    totalPedidos: number = 0;
    totalProdutos: number = 0;
    displayModal: boolean = false;
    pedidoId!: string;
    alertMessage!: IAlert;
    form!: FormGroup;

    constructor(private pedidoService : PedidoService, 
        private alertService: AlertService, private route: ActivatedRoute,
        private redirectRouter: Router, private changeDetector: ChangeDetectorRef, 
        private headerService : HeaderService) {
        headerService.headerData = {
            title: 'Pedidos',
            routerUrl: 'pdv/pedido/listar'
        }
    }

    ngOnInit() {
        this.pedidoService.getAll().subscribe(pedidos => {
            this.pedidos = pedidos;
            this.totalPedidos = pedidos.length;
        });
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
