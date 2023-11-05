import {
  ChangeDetectorRef,
  Component, OnInit
}
  from '@angular/core';
import {
  FormControl, FormGroup, Validators
}
  from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/templates/header/header.service';
import {
  IAlert
}
  from 'src/app/_interfaces/alert/iAlert';
import {
  IbaixaManual
}
  from 'src/app/_interfaces/estoque/ibaixa-manual';
import {
  Iestoqueoutput
}
  from 'src/app/_interfaces/estoque/iestoqueoutput';
import {
  EstoqueService
}
  from 'src/app/_services/estoque/estoque.service';
import { ProdutoService } from 'src/app/_services/produto/produto.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { ERROR, SUCCESS } from 'src/environments/environment';

@Component({ selector: 'app-estoque', templateUrl: './estoque.component.html', styleUrls: ['./estoque.component.scss'] }) export class EstoqueComponent implements OnInit {

  estoques : Iestoqueoutput[] = [{
    id: '',
    quantidade: 0,
    idProduto: '',
    produtoNome: '',
    produtoTamanho: '',
  }];
  motivos: any[] = [{ motivo: "Doação" }, { motivo: "Quebra" }, { motivo: "Venda" }];
  motivoSelecionado: string = '';
  totalRegistros: number = 0;
  alertMessage!: IAlert;
  formEstoque!: FormGroup;
  displayModal: boolean = false;
  estoqueId!: string;

  constructor(private estoqueService: EstoqueService, private produtoService: ProdutoService,
    private alertService: AlertService, private route: ActivatedRoute,
    private redirectRouter: Router, private changeDetector: ChangeDetectorRef, private headerService : HeaderService) {
      headerService.headerData = {
        title: 'Estoque',
        routerUrl: 'pdv/estoque/listar'
    }
     }

  ngOnInit(): void {
    this.formEstoque = new FormGroup({
      quantidade: new FormControl(0, [Validators.required]),
      motivo: new FormControl(this.motivoSelecionado, [Validators.required]),
      comentario: new FormControl('', [Validators.required])
    });

    this.getAll();    
  }

  getAll() {
    const estoques: Iestoqueoutput[] = [];
    this.produtoService.getAll().subscribe(produtos => {
      produtos.forEach(produto =>
        estoques.push({
          id: produto.estoque.id!,
          idProduto: produto.id!,
          quantidade: produto.estoque.quantidade,
          produtoNome: produto.nome,
          produtoTamanho: produto.tamanho
        })
      )
      this.totalRegistros = produtos.length;
    });
    this.estoques = estoques;
  }

  showModal(estoqueId: string) {
    this.estoqueId = estoqueId;
    this.displayModal = true;
  }

  baixaManual() {
    const listaBaixaManual: IbaixaManual[] = [{
      idEstoque: this.estoqueId,
      quantidade: this.formEstoque.get('quantidade')?.value,
      motivo: this.formEstoque.get('motivo')?.value,
      comentario: this.formEstoque.get('comentario')?.value,
      autor: 'leogui.moritz'
    }];

    try {
      this.displayModal = false;
      this.estoqueService.baixaManual(listaBaixaManual).subscribe({
        next: (v) => this.successMessage(v),
        error: (e) => this.errorMessage(e),
        complete: () => {
          this.getAll();
          this.changeDetector.detectChanges();
        },
      });
    }
    catch (error) {
      this.errorMessage(error);
    }
  }

  onEdit(event: any) {
    this.getAll();
  }

  successMessage(result: any) {
    if (result) {
      this.alertMessage = {
        title: '',
        message: 'Baixa Manual Realizada Com Sucesso!',
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
      title: 'Ocorreu um erro ao tentar realizar a baixa manual no estoque',
      message: error.error.message,
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

}
