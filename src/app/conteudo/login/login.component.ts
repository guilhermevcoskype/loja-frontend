import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';
import { Usuario } from '../model/usuario';
import { LoginService } from '../service/login.service';
import { UsuarioService } from '../service/usuario.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
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

  onSubmit() {
    if (this.formulario.valid) {
      this.usuarioService.logar(this.formulario.value).subscribe({
        next: (retorno) => {
          console.log(retorno);
          this.loginService.setToken(retorno);
          this.loginService.setNome(this.formulario.get('nome')?.value);
          this.router.navigate(["/conteudo/uLancamentos"]);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == HttpStatusCode.Unauthorized) {
            this.openModal('Login inválido. Favor tentar novamente.');
          } else if (error.status == HttpStatusCode.BadRequest) {
            this.openModal(
              'Ocorreu um erro na requisição, favor contatar o dev.'
            );
          } else this.openModal('Ocorreu um erro. Tente novamente.');
        },
      });
    }
  }

  public carregarTelaRegistrar() {
    this.router.navigate(['/conteudo/cadastroUsuario']);
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
  }
}
