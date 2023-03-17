import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/templates/header/header.service';
import { IAlert } from 'src/app/_interfaces/alert/iAlert';
import { IHistorico } from 'src/app/_interfaces/historico/i-historico';
import { IprodutoOutput } from 'src/app/_interfaces/produto/iproduto-output';
import { HistoricoService } from 'src/app/_services/historico/historico.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  historicos: IHistorico[] = [];
  produtos: any[] = [];
  alertMessage!: IAlert;
  form!: FormGroup;
  displayModal: boolean = false;
  historicoId!: string;
  totalRegistros: number = 0;

  constructor(private historicoService : HistoricoService, private alertService: AlertService, private route: ActivatedRoute,
    private redirectRouter: Router, private changeDetector: ChangeDetectorRef, private headerService : HeaderService) { 
      headerService.headerData = {
        title: 'Históricos Venda',
        routerUrl: 'pdv/historico/listar'
    }
    }

  ngOnInit(): void {
    this.historicoService.getAll().subscribe(historicos => {
      this.totalRegistros = historicos.length;
      historicos.forEach(historico => {
        this.produtos = historico.pedido.produtos;
        this.historicos.push({
          id: historico.id,
          produtos: historico.pedido.produtos,
          valorTotal: historico.pedido.valorTotal,
          descontoTotal: historico.pedido.descontoTotal,
          status: historico.pedido.status,
          metodoPagamento: historico.pedido.metodoPagamento,
          motivo: historico.pedido.motivo,
          evento: historico.pedido.evento,
          vendedor: historico.vendedor.nome,
          dataHora: historico.dataHora,
        });
      });
    });
  }

  showModal(historicoId: string) {
    console.log(this.produtos);
    this.historicoId = historicoId;
    this.displayModal = true;
  }

}
