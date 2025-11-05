import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';
import { LoginService } from '../service/login.service';
import { UsuarioService } from '../service/usuario.service';
import { RequestToken } from '../model/requestToken';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  usuarioSubscription!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private modalService: NgbModal,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.required,
          Validators.minLength(5),
        ]),
      ],
      senha: [
        "",
        Validators.compose([
          Validators.maxLength(200),
          Validators.required,
          Validators.minLength(3),
        ]),
      ],
      roles: ["USER"],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.usuarioSubscription = this.usuarioService.logar(this.formulario.value).subscribe({
        next: (retorno: RequestToken) => {
          this.loginService.setToken(retorno.token);
          const tokenDecodificado = this.jwtHelper.decodeToken(JSON.stringify(retorno));
          if(tokenDecodificado){
            this.loginService.setTokenDecodificado(tokenDecodificado);
            this.router.navigate(["/conteudo/uLancamentos"]);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == HttpStatusCode.Unauthorized) {
            this.openModal("Login inválido. Favor tentar novamente.", "Erro");
          } else if (error.status == HttpStatusCode.BadRequest) {
            this.openModal(
              "Ocorreu um erro na requisição, favor contatar o dev.", "Erro"
            );
          } else this.openModal("Ocorreu um erro. Tente novamente.", "Erro");
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.usuarioSubscription) this.usuarioSubscription.unsubscribe();
  }

  public carregarTelaRegistrar() {
    this.router.navigate(["/conteudo/cadastroUsuario"]);
  }

  openModal(message: string, titulo: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.titulo = titulo;
  }
}
