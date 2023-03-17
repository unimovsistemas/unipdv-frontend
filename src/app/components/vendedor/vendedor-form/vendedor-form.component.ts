import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IAlert } from 'src/app/_interfaces/alert/iAlert';
import { IUsuario } from 'src/app/_interfaces/usuario/i-usuario';
import { IVendedor } from 'src/app/_interfaces/vendedor/i-vendedor';
import { UserService } from 'src/app/_services/user/user.service';
import { VendedorService } from 'src/app/_services/vendedor/vendedor.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { ERROR, SUCCESS } from 'src/environments/environment';

@Component({
  selector: 'app-vendedor-form',
  templateUrl: './vendedor-form.component.html',
  styleUrls: ['./vendedor-form.component.scss']
})
export class VendedorFormComponent implements OnInit {

  usuarioForm!: FormGroup;
  usuarioInput!: IUsuario;
  vendedorForm!: FormGroup;
  vendedorInput!: IVendedor;
  usuarioId!: string;
  stepIndex: number = 0;
  alertMessage!: IAlert;
  steps!: MenuItem[];

  constructor(private userService: UserService, private vendorService: VendedorService,
    private alertService : AlertService, private redirectRouter : Router) {
    this.usuarioForm = new FormGroup({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      master: new FormControl(false),
    });

    this.vendedorForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      celular: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      cpf: new FormControl(''),
      congregacao: new FormControl('')
    });
    this.steps  = [
      {label: 'Dados do Usuário'},
      {label: 'Dados do Vendedor'},
    ];
  }

  ngOnInit(): void {
  }

  submitUserForm() {
    if (this.usuarioForm.valid) {
      this.usuarioInput = this.getNovoUsuario();
      this.stepIndex = 1;
      return;
    }
    this.errorMessage("Existem um ou mais campos obrigatórios no formulário que não foram preenchidos corretamente.");
  }

  getNovoUsuario(): IUsuario {
    return {
      login: this.usuarioForm.get('login')?.value,
      password: this.usuarioForm.get('senha')?.value,
      master: this.usuarioForm.get('master')?.value,
      autor: "leogui.moritz",
    }
  }

  submitVendorForm() {
    if (this.vendedorForm.valid) {   
      const vendedor: IVendedor = this.getNovoVendedor();
      try {
        this.vendorService.save(vendedor).subscribe({
          next: (v) => this.successMessage(v),
          error: (e) => this.errorMessage(e.error.message),
          complete: () => this.redirectRouter.navigate(["../pdv/vendedor/listar"]),
        });
      } catch (error : any) {
        this.errorMessage(error.error.message);
      }
      return;
    }

    this.errorMessage("Existem um ou mais campos obrigatórios no formulário que não foram preenchidos corretamente.");
  }

  getNovoVendedor(): IVendedor {
    return {
      nome: this.vendedorForm.get('nome')?.value,
      celular: this.vendedorForm.get('celular')?.value,
      email: this.vendedorForm.get('email')?.value,
      cpf: this.vendedorForm.get('cpf')?.value,
      congregacao: this.vendedorForm.get('congregacao')?.value,
      usuario: this.usuarioInput,
      autor: "leogui.moritz",
    }
  }

  successMessage(result: any) {
    if (result) {
      this.alertMessage = {
        title: '',
        message: 'Vendedor cadastrado com sucesso!',
        typeAlert: SUCCESS,
      };
      this.alertService.showGenericAlert(this.alertMessage);
    } else {
      this.errorMessage("Entre em contato com o Administrador do Sistema!");
    }
  }

  errorMessage(customMessage : any) {
    this.alertMessage = {
      title: 'Ocorreu um erro ao cadastrar o Vendedor',
      message: customMessage,
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

}
