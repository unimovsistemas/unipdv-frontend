import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { HeaderService } from 'src/app/templates/header/header.service';
import { IAlert } from 'src/app/_interfaces/alert/iAlert';
import { IcategoriaOutput } from 'src/app/_interfaces/categoria/icategoria-output';
import { IprodutoInput } from 'src/app/_interfaces/produto/iproduto-input';
import { CategoriaService } from 'src/app/_services/categoria/categoria.service';
import { ProdutoService } from 'src/app/_services/produto/produto.service';
import {AlertService} from 'src/app/_shared/alert/alert.service';
import { ERROR, ROTA_LISTA_PRODUTOS, SUCCESS } from 'src/environments/environment';

@Component({selector: 'app-produto-form', templateUrl: './produto-form.component.html', styleUrls: ['./produto-form.component.scss']})
export class ProdutoFormComponent implements OnInit {

    produto : IprodutoInput = {
        codigo: '',
        nome: '',
        descricao: '',
        preco: 0.0,
        desconto: 0.0,
        estoque: {quantidade: 0},
        tamanho: '',
        autor: '',
        idCategoria: ''
    };

    categorias: IcategoriaOutput[] = [{
        id: '',
        nome: ''
    }];

    categoriasSelecionadas!: IcategoriaOutput;
    formProduto !: FormGroup;
    alertMessage!: IAlert;

    @Input() produtoId?: string;

    constructor(private headerService : HeaderService, private produtoService : ProdutoService, 
      private formBuilder : FormBuilder, private alertService : AlertService,
      private categoriaService : CategoriaService, private route : ActivatedRoute, 
      private redirectRouter : Router) {
        headerService.headerData = {
            title: 'Cadastro Produto',
            routerUrl: 'pdv/produto/cadastrar'
        }
    }

    ngOnInit(): void {
        this.formProduto = new FormGroup({
            codigo: new FormControl('', [Validators.required]),
            nome: new FormControl('', [Validators.required]),
            descricao: new FormControl(''),
            tamanho: new FormControl(''),
            desconto: new FormControl(0.0),
            preco: new FormControl(0.0, [Validators.required]),
            quantidade: new FormControl('', [Validators.required]),
            categoria: new FormControl('', [Validators.required])
        });
        this.categoriaService.getAll().subscribe(categorias => this.categorias = categorias);
        this.getProdutoToUpdate();
      }
    
      getProdutoToUpdate() {
        const categoriaId = this.getProdutoId();
        
        if(categoriaId){
          this.produtoService.getById(categoriaId).subscribe(produto => {
            this.produtoId = produto.id;
            this.formProduto.get('codigo')?.setValue(produto.codigo);
            this.formProduto.get('nome')?.setValue(produto.nome);
            this.formProduto.get('descricao')?.setValue(produto.descricao);
            this.formProduto.get('tamanho')?.setValue(produto.tamanho);
            this.formProduto.get('desconto')?.setValue(produto.desconto);
            this.formProduto.get('preco')?.setValue(produto.preco);
            this.formProduto.get('quantidade')?.setValue(produto.estoque.quantidade);
            this.formProduto.get('categoria')?.setValue(produto.categoria.id);
        });
        }
      }
    
      getProdutoId(): string {
        return this.route.snapshot.params['id'];
      }

    salvar(): void {
        if (!this.isUpdate()) {
          this.post(this.getNovoProduto());
        } else {
          this.put(this.getProduto());
        }
      }
    
      isUpdate(): boolean {
        return this.route.snapshot.params['id'] ? true : false;
      }
    
      getNovoProduto(): IprodutoInput {
        return {
            codigo: this.formProduto.get('codigo')?.value,
            nome: this.formProduto.get('nome')?.value,
            descricao: this.formProduto.get('descricao')?.value,
            preco: this.formProduto.get('preco')?.value,
            desconto: this.formProduto.get('desconto')?.value,
            tamanho: this.formProduto.get('tamanho')?.value,
            idCategoria: this.formProduto.get('categoria')?.value,
            estoque: {
                quantidade: this.formProduto.get('quantidade')?.value,
            },
            autor: "leogui.moritz"
      };
      }
    
      getProduto(): IprodutoInput {
        return {
            id: this.produtoId,
            codigo: this.formProduto.get('codigo')?.value,
            nome: this.formProduto.get('nome')?.value,
            descricao: this.formProduto.get('descricao')?.value,
            preco: this.formProduto.get('preco')?.value,
            desconto: this.formProduto.get('desconto')?.value,
            tamanho: this.formProduto.get('tamanho')?.value,
            idCategoria: this.formProduto.get('categoria')?.value,
            estoque: {
                quantidade: this.formProduto.get('quantidade')?.value,
            },
            autor: "leogui.moritz"
        };
      }
    
      post(icategoria: IprodutoInput): boolean {
        if (!icategoria || this.formProduto.invalid) {
          this.messageErrorForm();
          return false;
        }
    
        try {
          this.produtoService.save(icategoria).subscribe({
            next: (v) => this.messagePost(v),
            error: (e) => this.messageErrorPost(),
            complete: () => this.redirectRouter.navigate([ROTA_LISTA_PRODUTOS]),
          });
        } catch (error) {
          this.messageErrorPost();
          return false;
        }
    
        return true;
      }
    
      put(icategoria: IprodutoInput): boolean  {
        if (!icategoria || this.formProduto.invalid) {
          this.messageErrorFormUpdate();
          return false;
        }
    
        try {
          this.produtoService.update(icategoria).subscribe({
            next: (v) => this.messagePut(v),
            error: (e) => this.messageErrorPut(),
            complete: () => this.redirectRouter.navigate([ROTA_LISTA_PRODUTOS]),
          });
        } catch (error) {
          this.messageErrorPost();
          return false;
        }
    
        return true;
      }
    
      messagePost(result: any) {
        if (result) {
          this.alertMessage = {
            title: '',
            message: 'Categoria cadastrada com sucesso!',
            typeAlert: SUCCESS,
          };
          this.alertService.showGenericAlert(this.alertMessage);
        } else {
          this.messageErrorPost();
        }
      }
  
      messagePut(result: any) {
        if (result) {
          this.alertMessage = {
            title: '',
            message: 'Categoria atualizada com sucesso!',
            typeAlert: SUCCESS,
          };
          this.alertService.showGenericAlert(this.alertMessage);
        } else {
          this.messageErrorPut();
        }
      }
    
      messageErrorPost() {
        this.alertMessage = {
          title: 'Ocorreu um erro ao cadastrar a Categoria',
          message: 'Entre em contato com o administrador do sistema.',
          typeAlert: ERROR,
        };
        this.alertService.showGenericAlert(this.alertMessage);
      }
  
      messageErrorPut() {
        this.alertMessage = {
          title: 'Ocorreu um erro ao atualizar a Categoria',
          message: 'Entre em contato com o administrador do sistema.',
          typeAlert: ERROR,
        };
        this.alertService.showGenericAlert(this.alertMessage);
      }
  
      messageErrorForm() {
        this.alertMessage = {
          title: 'Ocorreu um erro ao cadastrar a Categoria',
          message: 'Favor preencher todos os campos obrigatórios.',
          typeAlert: ERROR,
        };
        this.alertService.showGenericAlert(this.alertMessage);
      }
  
      messageErrorFormUpdate() {
        this.alertMessage = {
          title: 'Ocorreu um erro ao atualizar a Categoria',
          message: 'Favor preencher todos os campos obrigatórios.',
          typeAlert: ERROR,
        };
        this.alertService.showGenericAlert(this.alertMessage);
      }

}
