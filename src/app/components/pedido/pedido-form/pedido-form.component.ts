import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from 'src/app/templates/header/header.service';
import {IAlert} from 'src/app/_interfaces/alert/iAlert';
import {IPedido, IPedidoInput} from 'src/app/_interfaces/pedido/i-pedido';
import {IPedidoProduto} from 'src/app/_interfaces/pedido/i-pedido-produto';
import {IprodutoInput} from 'src/app/_interfaces/produto/iproduto-input';
import {IprodutoOutput} from 'src/app/_interfaces/produto/iproduto-output';
import {PedidoService} from 'src/app/_services/pedido/pedido.service';
import {ProdutoService} from 'src/app/_services/produto/produto.service';
import {AlertService} from 'src/app/_shared/alert/alert.service';
import {ERROR, SUCCESS} from 'src/environments/environment';

@Component({selector: 'app-pedido-form', templateUrl: './pedido-form.component.html', styleUrls: ['./pedido-form.component.scss']})
export class PedidoFormComponent implements OnInit {
    productCode !: string;
    shoppingList : IprodutoOutput[] = [];
    produtosEstoque : IprodutoOutput[] = [];
    valorTotalPedido : number = 0;
    descontoTotalPedido : number = 0;
    totalProdutos : number = 0;
    totalPedidoProdutos : number = 0;
    alertMessage !: IAlert;
    formPedido !: FormGroup;
    pedido !: IPedidoInput;
    displayModalPedido : boolean = false;
    isDoacao : boolean = false;
    isFiado : boolean = false;
    pedidoStatus : any[] = [
        'Pago',
        'Pendente Pagamento',
        'Cancelado',
        'Enviado',
        'Entregue'
    ];
    pedidoStatusSelecionado : string = '';
    metodosPagamento : any[] = [
        'Dinheiro',
        'Pix',
        'Débito',
        'Crédito',
        'Outro'
    ];
    metodoPagamentoSelecionado : string = '';

    constructor(private headerService : HeaderService, private produtoService : ProdutoService, private alertService : AlertService, private changeDetector : ChangeDetectorRef, private pedidoService : PedidoService, private route : ActivatedRoute, private redirectRouter : Router) {
        headerService.headerData = {
            title: 'Novo Pedido',
            routerUrl: 'pdv/pedido/listar'
        }
    }

    ngOnInit() {
        this.formPedido = new FormGroup({
            nomeCliente: new FormControl('', [Validators.required]),
            percentualDescontoPedido: new FormControl(0),
            pedidoStatus: new FormControl('', [Validators.required]),
            metodoPagamento: new FormControl('', [Validators.required]),
            doacao: new FormControl('', [Validators.required]),
            fiado: new FormControl('', [Validators.required])
        });

        this.getAllProdutosParaVenda();
    }

    private getAllProdutosParaVenda() {
        this.produtoService.getAll().subscribe(produtos => this.produtosEstoque = produtos);
    }

    addProductToList() {
        if (this.productCode == null) {
            this.errorMessage("O código do Produto não pode ser nulo ou vazio!");
            return;
        }

        const produto = this.produtosEstoque.find(produto => this.filtrarPorCodigo(produto, this.productCode));

        if (produto) {
            this.shoppingList.push(produto);
            this.productCode = '';
            this.totalProdutos = this.totalProdutos + 1;
        } else {
            this.errorMessage("O produto informado não foi encontrado ou não está mais disponível no Estoque!")
        }
    }

    // função de filtragem que verifica se o código do produto é igual ao código procurado
    filtrarPorCodigo(produto : IprodutoOutput, codigoProcurado : string) {
        return produto.codigo === codigoProcurado && produto.estoque.quantidade > 0;
    }

    removerItemLista(code : string) {
        const newShoppingList = this.shoppingList.filter(produto => produto.codigo !== code);
        this.shoppingList = newShoppingList;
        this.changeDetector.detectChanges();
    }

    clearShoppingList() {
        this.shoppingList = [];
    }

    finalizeOrder() { // Coloque aqui a lógica para finalizar o pedido
        this.pedido = {
            pedidoProdutos: [],
            nomeCliente: '',
            percentualDescontoPedido: 0,
            valorDescontoPedido: 0,
            pedidoStatus: '',
            metodoPagamento: '',
            doacao: false,
            fiado: false,
            evento: 'Conferência UPSIDE DOWN',
            autor: 'leogui.moritz'
        };

        this.shoppingList.forEach(produto => {
            this.pedido.pedidoProdutos ?. push(this.toPedidoProduto(produto));
            this.totalPedidoProdutos = this.pedido.pedidoProdutos ?. length !;
            this.calcularValorTotal(produto.preco, produto.desconto, produto.pedidoQuantidade !);
        });
        this.displayModalPedido = true;

    }

    calcularValorTotal(preco : number, desconto : number, pedidoQuantidade : number) {
        if (preco != null && desconto != null && pedidoQuantidade != null) {
            this.valorTotalPedido = preco * pedidoQuantidade;
            if (desconto > 0) {
                let descontoValor = this.valorTotalPedido * (desconto / 100);
                this.descontoTotalPedido = this.valorTotalPedido - descontoValor;
            } else {
                this.descontoTotalPedido = 0;
            }
        }
    }

    toPedidoProduto(produto : IprodutoOutput) {
        let pedidoProduto: IPedidoProduto = {
            idProduto: '',
            quantidade: 0,
            autor: 'leogui.moritz'
        };
        pedidoProduto.idProduto = produto.id !;
        pedidoProduto.quantidade = produto.pedidoQuantidade !;
        return pedidoProduto;
    }

    concluirPedido() {
        if (!this.pedido || this.formPedido.invalid) {
            this.errorMessage("Existem campos inválidos no formulário");
            return;
        }

        const pedido = this.getPedidoToSave();

        try {
            this.pedidoService.save(pedido).subscribe({
                next: (pedidos) => this.successMessage(pedidos),
                error: (e) => this.errorMessage(e.error.message),
                complete: () => this.redirectRouter.navigate(["../pdv/pedido/listar"])
            });
        } catch (error : any) {
            this.errorMessage(error.error.message);
        }
    }

    getPedidoToSave(): IPedidoInput {
        this.pedido.nomeCliente = this.formPedido.get('nomeCliente') ?. value;
        this.pedido.percentualDescontoPedido = this.formPedido.get('percentualDescontoPedido') ?. value;
        this.pedido.pedidoStatus = this.formPedido.get('pedidoStatus') ?. value;
        this.pedido.metodoPagamento = this.formPedido.get('metodoPagamento') ?. value;
        this.pedido.doacao = this.formPedido.get('doacao') ?. value;
        this.pedido.fiado = this.formPedido.get('fiado') ?. value;
        return this.pedido;
    }

    /*consultarPedido(){
    try {
        this.pedidoService.findAllPedidoPorNomeCliente(this.nomeCliente).subscribe({
          next: (pedidos) => {
            this.pedidos = pedidos; 
            this.totalPedidos = pedidos.length;
        },
          error: (e) => this.errorMessage(e),
          complete: () => console.log('OK'),
        });
      }
      catch (error) {
        this.errorMessage(error);
      }
    }*/

    successMessage(result : any) {
        if (result) {
            this.alertMessage = {
                title: '',
                message: 'Pedido Realizado Com Sucesso!',
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
            title: 'Ocorreu um erro ao tentar realizar a busca dos pedidos',
            message: error,
            typeAlert: ERROR
        };
        this.alertService.showGenericAlert(this.alertMessage);
    }

}
