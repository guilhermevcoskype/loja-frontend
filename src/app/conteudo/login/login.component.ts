import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
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
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // Injeções Modernas
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private loginService = inject(LoginService);
  private modalService = inject(NgbModal);
  private jwtHelper = inject(JwtHelperService);

  formulario!: FormGroup;
  private sub?: Subscription;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      senha: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      roles: ["USER"]
    });
  }

  onSubmit() {
    if (this.formulario.invalid) return;

    this.sub = this.usuarioService.logar(this.formulario.value).subscribe({
      next: (retorno) => {
        this.loginService.setToken(retorno.token);
        const decoded = this.jwtHelper.decodeToken(retorno.token);
        if (decoded) {
          this.loginService.setTokenDecodificado(decoded);
          this.router.navigate(["/conteudo/uLancamentos"]);
        }
      },
      error: (err: HttpErrorResponse) => {
        let msg = "Ocorreu um erro. Tente novamente.";
        if (err.status === HttpStatusCode.Unauthorized) msg = "Login ou senha inválidos.";
        this.openModal(msg, "Erro de Acesso");
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  carregarTelaRegistrar() {
    this.router.navigate(["/conteudo/cadastroUsuario"]);
  }

  openModal(message: string, titulo: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.titulo = titulo;
  }
}