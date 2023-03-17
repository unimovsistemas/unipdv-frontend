import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HeaderService } from 'src/app/templates/header/header.service';
import { IAlert } from 'src/app/_interfaces/alert/iAlert';
import {IVendedor} from 'src/app/_interfaces/vendedor/i-vendedor';
import {HistoricoService} from 'src/app/_services/historico/historico.service';
import {VendedorService} from 'src/app/_services/vendedor/vendedor.service';
import {AlertService} from 'src/app/_shared/alert/alert.service';
import { ERROR, SUCCESS } from 'src/environments/environment';

@Component({selector: 'app-vendedor', templateUrl: './vendedor.component.html', styleUrls: ['./vendedor.component.scss']})
export class VendedorComponent implements OnInit {

    vendedores : IVendedor[] = [];
    alertMessage!: IAlert;

    constructor(private vendedorService : VendedorService, private historicoService : HistoricoService,
       private alertService : AlertService, private route : ActivatedRoute, 
       private redirectRouter : Router, private changeDetector : ChangeDetectorRef,
       private headerService : HeaderService) {
      headerService.headerData = {
        title: 'Vendedores',
        routerUrl: 'pdv/vendedor/listar'
    }
    }

    ngOnInit(): void {
        this.vendedorService.getAll().subscribe(vendedores => {
            this.vendedores = vendedores;
            this.getTotalVendasPorVendedor();
        });
    }

    getTotalVendasPorVendedor() {
        this.vendedores.forEach(vendedor => {
            this.historicoService.getTotalVendasPorVendedor(vendedor.id!) //
            .subscribe(total => vendedor.qtdVendas = total);
        });
    }

    deletar(id: string) {
      try {
          this.vendedorService.delete(id).subscribe({
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
          message: 'Vendedor deletado com sucesso!',
          typeAlert: SUCCESS,
        };
        this.alertService.showGenericAlert(this.alertMessage);
      } else {
        this.messageErrorDelete("Entre em contato com o Administrador do Sistema");
      }
    }

    messageErrorDelete(e: any) {
      this.alertMessage = {
        title: 'Ocorreu um erro ao deletar o Vendedor',
        message: e.error.message,
        typeAlert: ERROR,
      };
      this.alertService.showGenericAlert(this.alertMessage);
    }

}
