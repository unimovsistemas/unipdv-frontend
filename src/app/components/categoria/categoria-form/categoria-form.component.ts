import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from 'src/app/templates/header/header.service';
import { IAlert } from 'src/app/_interfaces/alert/iAlert';
import {IcategoriaInput} from 'src/app/_interfaces/categoria/icategoria-input';
import {CategoriaService} from 'src/app/_services/categoria/categoria.service';
import {AlertService} from 'src/app/_shared/alert/alert.service';
import { ERROR, ROTA_LISTA_CATEGORIAS, SUCCESS } from 'src/environments/environment';

@Component({selector: 'app-categoria-form', templateUrl: './categoria-form.component.html', styleUrls: ['./categoria-form.component.scss']})
export class CategoriaFormComponent implements OnInit {

    categoria: IcategoriaInput = {
      nome: '',
      autor: '',
    };
    formCategoria !: FormGroup;
    alertMessage!: IAlert;
    categoriaId?: string;


    constructor(private headerService : HeaderService, private categoriaService : CategoriaService, 
      private formBuilder : FormBuilder, private alertService : AlertService, 
      private route : ActivatedRoute, private redirectRouter : Router) {
        headerService.headerData = {
            title: 'Cadastro Categoria',
            routerUrl: 'pdv/categoria/cadastrar'
        }
    }

    ngOnInit(): void {
      this.formCategoria = new FormGroup({
        nome: new FormControl('', [Validators.required])
      });
      this.getCatetoriaToUpdate();
    }

    getCatetoriaToUpdate() {
      const categoriaId = this.getCategoriaId();
      
      if(categoriaId){
        this.categoriaService.getById(categoriaId).subscribe(categoria => {
          this.categoriaId = categoria.id;
          this.formCategoria.get('nome')?.setValue(categoria.nome);
      });
      }
    }

    getCategoriaId(): string {
      return this.route.snapshot.params['id'];
    }

    salvar(): void {
      if (!this.isUpdate()) {
        this.post(this.getNovaCategoria());
      } else {
        this.put(this.getCategoria());
      }
    }
  
    isUpdate(): boolean {
      return this.route.snapshot.params['id'] ? true : false;
    }
  
    getNovaCategoria(): IcategoriaInput {
      return {
        nome: this.formCategoria.get('nome')?.value,
        autor: "leogui.moritz"
    };
    }
  
    getCategoria(): IcategoriaInput {
      return {
        id: this.categoriaId,
        nome: this.formCategoria.get('nome')?.value,
        autor: "leogui.moritz"
      };
    }
  
    post(icategoria: IcategoriaInput): boolean {
      if (!icategoria || this.formCategoria.invalid) {
        this.messageErrorForm();
        return false;
      }
  
      try {
        this.categoriaService.save(icategoria).subscribe({
          next: (v) => this.messagePost(v),
          error: (e) => this.messageErrorPost(),
          complete: () => this.redirectRouter.navigate([ROTA_LISTA_CATEGORIAS]),
        });
      } catch (error) {
        this.messageErrorPost();
        return false;
      }
  
      return true;
    }
  
    put(icategoria: IcategoriaInput): boolean  {
      if (!icategoria || this.formCategoria.invalid) {
        this.messageErrorFormUpdate();
        return false;
      }
  
      try {
        this.categoriaService.update(icategoria).subscribe({
          next: (v) => this.messagePut(v),
          error: (e) => this.messageErrorPut(),
          complete: () => this.redirectRouter.navigate([ROTA_LISTA_CATEGORIAS]),
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
