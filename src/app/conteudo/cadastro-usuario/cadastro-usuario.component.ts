import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
})
export class CadastroUsuarioComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  usuarioSubscription!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private usuarioService: UsuarioService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [
        '',
        Validators.compose([
          Validators.maxLength(100),
          Validators.required,
          Validators.minLength(5),
        ]),
      ],
      senha: [
        '',
        Validators.compose([
          Validators.maxLength(200),
          Validators.required,
          Validators.minLength(3),
        ]),
      ],
      roles: ['ROLE_USER'],
    });
  }

  enviar() {
    if (this.formulario.valid) {
      this.usuarioSubscription = this.usuarioService
        .cadastrarUsuario(this.formulario.value)
        .subscribe({
          next: (response) => {
            this.openModal('Cadastrado com sucesso!', "Sucesso");
          },
          error: (erro) => {
            console.log(erro);
            this.openModal('Ocorreu um erro, favor contatar o dev.', "Erro");
          },
        });
    }
    this.formulario.reset();
  }

  ngOnDestroy(): void {
    if (this.usuarioSubscription) this.usuarioSubscription.unsubscribe();
  }

  openModal(message: string, titulo: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.titulo = titulo;
  }

  habilitarBotao() {
    if (this.formulario.valid) {
      return 'btn btn-primary';
    } else return 'btn btn-secondary';
  }
}
