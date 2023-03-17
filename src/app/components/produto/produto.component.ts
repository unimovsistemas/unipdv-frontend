import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from 'src/app/templates/header/header.service';
import {IAlert} from 'src/app/_interfaces/alert/iAlert';
import {IprodutoOutput} from 'src/app/_interfaces/produto/iproduto-output';
import {ProdutoService} from 'src/app/_services/produto/produto.service';
import {AlertService} from 'src/app/_shared/alert/alert.service';
import {ERROR, ROTA_LISTA_PRODUTOS, SUCCESS} from 'src/environments/environment';

@Component({selector: 'app-produto', templateUrl: './produto.component.html', styleUrls: ['./produto.component.scss']})
export class ProdutoComponent implements OnInit {

    produtos : IprodutoOutput[] = [{
            id: '',
            codigo: '',
            nome: '',
            descricao: '',
            preco: 0.0,
            desconto: 0.0,
            categoria: {
                id: '',
                nome: ''
            },
            tamanho: '',
            estoque: {
                id: '',
                idProduto: '',
                quantidade: 0
            }
        }];

    totalRegistros : number = 0;
    alertMessage !: IAlert;

    constructor(private headerService : HeaderService, private produtoService : ProdutoService, private alertService : AlertService, private route : ActivatedRoute, private redirectRouter : Router) {
        headerService.headerData = {
            title: 'Produtos',
            routerUrl: 'pdv/produto/listar'
        }
    }

    ngOnInit(): void {
        this.produtoService.getAll().subscribe(produtos => {
            this.produtos = produtos;
            this.totalRegistros = produtos.length;
        });
    }

    deletar(id : string) {
        try {
            this.produtoService.delete(id).subscribe({
                next: (v) => this.messageDelete(v),
                error: (e) => this.messageErrorDelete(e),
                complete: () => location.reload()
            });
        } catch (error) {
            this.messageErrorDelete(error);
            return false;
        }

        return true;

    }

    messageDelete(result : any) {
        if (result) {
            this.alertMessage = {
                title: '',
                message: 'Produto deletado com sucesso!',
                typeAlert: SUCCESS
            };
            this.alertService.showGenericAlert(this.alertMessage);
        } else {
            this.messageErrorDelete("Entre em contato com o Administrador do Sistema");
        }
    }

    messageErrorDelete(e : any) {
        this.alertMessage = {
            title: 'Ocorreu um erro ao deletar o Produto',
            message: e,
            typeAlert: ERROR
        };
        this.alertService.showGenericAlert(this.alertMessage);
    }

}
