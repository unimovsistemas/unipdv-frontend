import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HeaderService} from 'src/app/templates/header/header.service';
import { IAlert } from 'src/app/_interfaces/alert/iAlert';
import {IcategoriaOutput} from 'src/app/_interfaces/categoria/icategoria-output';
import {CategoriaService} from 'src/app/_services/categoria/categoria.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { ERROR, SUCCESS } from 'src/environments/environment';

@Component({selector: 'app-categoria', templateUrl: './categoria.component.html', 
styleUrls: ['./categoria.component.scss']})
export class CategoriaComponent implements OnInit {

    categorias!: IcategoriaOutput[];

    totalRegistros: number = 0;
    alertMessage!: IAlert;

    constructor(private headerService : HeaderService, private categoriaService : CategoriaService,
        private alertService: AlertService,  private route : ActivatedRoute,
        private redirectRouter : Router) {
        headerService.headerData = {
            title: 'Categorias',
            routerUrl: 'pdv/categoria/listar'
        }
    }

    ngOnInit(): void {
        this.categoriaService.getAll().subscribe(categorias => {
            this.categorias = categorias;
            this.totalRegistros = categorias.length;
          });
    }

    deletar(id: string) {
        try {
            this.categoriaService.delete(id).subscribe({
              next: (v) => this.messageDelete(v),
              error: (e) => this.messageErrorDelete(e),
              complete: () => location.reload(),
            });
          } catch (error) {
            this.messageErrorDelete(error);
            return false;
          }
      
          return true;
        
    }

    messageDelete(result: any) {
        if (result) {
          this.alertMessage = {
            title: '',
            message: 'Categoria deletada com sucesso!',
            typeAlert: SUCCESS,
          };
          this.alertService.showGenericAlert(this.alertMessage);
        } else {
          this.messageErrorDelete("Entre em contato com o Administrador do Sistema");
        }
      }

      messageErrorDelete(e: any) {
        this.alertMessage = {
          title: 'Ocorreu um erro ao deletar a Categoria',
          message: e.error.message,
          typeAlert: ERROR,
        };
        this.alertService.showGenericAlert(this.alertMessage);
      }
}
