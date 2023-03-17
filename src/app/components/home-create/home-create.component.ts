import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {HeaderService} from 'src/app/templates/header/header.service';
import {DashboardService} from 'src/app/_services/dashboard/dashboard.service';

@Component({selector: 'app-home-create', templateUrl: './home-create.component.html', styleUrls: ['./home-create.component.scss']})
export class HomeCreateComponent implements OnInit {

    totalComSaldo : number = 0;
    totalSemSaldo : number = 0;
    totalProdutosCadastrados : number = 0;
    totalSaidasDoacao : number = 0;
    totalSaidasQuebra : number = 0;
    valorTotalVendas : number = 0;
    quantidadeTotalVendas : number = 0;

    data : any;

    items!: MenuItem[];

    constructor(private headerService : HeaderService, private dashboardService : DashboardService) {
        headerService.headerData = {
            title: 'DashBoard',
            routerUrl: 'pdv/home'
        }
    }

    ngOnInit(): void {
        this.setTotalComSaldo();
        this.setTotalSemSaldo();
        this.setTotalProdutosCadastrados();
        this.setTotalSaidasDoacao();
        this.setTotalSaidasQuebra();
        this.setValorTotalVendas();
        this.setQuantidadeTotalVendas();
        //this.gerarGraficoEstoque();
        this.data = {
            labels: [
                'Com saldo', 'Sem saldo'
            ],
            datasets: [
                {
                    data: [
                        this.totalComSaldo, this.totalSemSaldo
                    ],
                    backgroundColor: ['#FF6384', '#36A2EB']
                }
            ]
        }
        this.data = {
                labels: [
                    'Com saldo', 'Sem saldo'
                ],
                datasets: [
                    {
                        data: [
                            this.totalComSaldo, this.totalSemSaldo
                        ],
                        backgroundColor: ['#FF6384', '#36A2EB']
                    }
                ]
            };
    }

    setTotalComSaldo() {
       this.dashboardService.getTotalProdutosComSaldoEstoque().subscribe(quantidade => this.totalComSaldo = quantidade);
    }

    setTotalSemSaldo() {
        this.dashboardService.getTotalProdutosSemSaldoEstoque().subscribe(quantidade => this.totalSemSaldo = quantidade);
    }

    setTotalProdutosCadastrados() {
        this.dashboardService.getTotalProdutosCadastrados().subscribe(total => this.totalProdutosCadastrados = total);
    }

    setTotalSaidasDoacao() {
        this.dashboardService.getTotalSaidasDoacao().subscribe(total => this.totalSaidasDoacao = total);
    }

    setTotalSaidasQuebra() {
        this.dashboardService.getTotalSaidasQuebra().subscribe(total => this.totalSaidasQuebra = total);
    }

    setValorTotalVendas() {
        this.dashboardService.getValorTotalVendas().subscribe(total => this.valorTotalVendas = total);
    }

    setQuantidadeTotalVendas() {
        this.dashboardService.getQuantidadeTotalVendas().subscribe(total => this.quantidadeTotalVendas = total);
    }

    gerarGraficoEstoque() {
        
      }
}
