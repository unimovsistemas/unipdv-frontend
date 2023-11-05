import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from 'src/app/templates/header/header.service';
import {IAlert} from 'src/app/_interfaces/alert/iAlert';
import {IbaixaManual} from 'src/app/_interfaces/estoque/ibaixa-manual';
import {Iestoqueoutput} from 'src/app/_interfaces/estoque/iestoqueoutput';
import {EstoqueService} from 'src/app/_services/estoque/estoque.service';
import {ProdutoService} from 'src/app/_services/produto/produto.service';
import {AlertService} from 'src/app/_shared/alert/alert.service';
import {ERROR, SUCCESS} from 'src/environments/environment';

@Component({selector: 'app-consulta-estoque', templateUrl: './consulta-estoque.component.html', styleUrls: ['./consulta-estoque.component.scss']})
export class ConsultaEstoqueComponent implements OnInit {
    codigoProduto : string = '';
    estoques : Iestoqueoutput[] = [];
    motivos : any[] = [
        {
            motivo: "Doação"
        }, {
            motivo: "Quebra"
        }, {
            motivo: "Venda"
        }
    ];
    motivoSelecionado : string = '';
    totalRegistros : number = 0;
    alertMessage !: IAlert;
    formEstoque !: FormGroup;
    displayModal : boolean = false;
    estoqueId !: string;

    constructor(private estoqueService : EstoqueService, private produtoService : ProdutoService, private alertService : AlertService, private route : ActivatedRoute, private redirectRouter : Router, private changeDetector : ChangeDetectorRef, private headerService : HeaderService) {}

    ngOnInit(): void {}

    consultarEstoque() {
        this.estoques = [];
        try {
            this.produtoService.findProdutoPorCodigo(this.codigoProduto).subscribe({
                next: (produto) => {
                    const estoque: Iestoqueoutput = {
                        id: produto.estoque.id,
                        idProduto: produto.id !,
                        quantidade: produto.estoque.quantidade,
                        produtoNome: produto.nome,
                        produtoTamanho: produto.tamanho

                    }
                    this.estoques.push(estoque);
                },
                error: (e) => this.errorMessage(e),
                complete: () => console.log('OK')
            });
        } catch (error) {
            this.errorMessage(error);
        }
    }

    baixaManual() {
        const listaBaixaManual: IbaixaManual[] = [{
                idEstoque: this.estoqueId,
                quantidade: this.formEstoque.get('quantidade') ?. value,
                motivo: this.formEstoque.get('motivo') ?. value,
                comentario: this.formEstoque.get('comentario') ?. value,
                autor: 'leogui.moritz'
            }];

        try {
            this.displayModal = false;
            this.estoqueService.baixaManual(listaBaixaManual).subscribe({
                next: (v) => this.successMessage(v),
                error: (e) => this.errorMessage(e),
                complete: () => {
                    this.changeDetector.detectChanges();
                }
            });
        } catch (error) {
            this.errorMessage(error);
        }
    }

    successMessage(result : any) {
        if (result) {
            this.alertMessage = {
                title: '',
                message: 'Operação Realizada Com Sucesso!',
                typeAlert: SUCCESS
            };
            this.alertService.showGenericAlert(this.alertMessage);
        } else {
            this.errorMessage("Entre em contato com o Administrador do Sistema!");
        }
    }

    errorMessage(error : any) {
        console.log(error);
        this.alertMessage = {
            title: 'Ocorreu um erro ao tentar realizar a busca do estoque',
            message: error.error.message,
            typeAlert: ERROR
        };
        this.alertService.showGenericAlert(this.alertMessage);
    }

    showModal(estoque : Iestoqueoutput) {
        this.estoques.push(estoque);
        this.displayModal = true;
    }
}
