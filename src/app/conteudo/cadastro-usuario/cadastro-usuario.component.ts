import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../service/usuario.service';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // NgIf e NgClass não são mais necessários aqui
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit, OnDestroy {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private modalService = inject(NgbModal);

  formulario!: FormGroup;
  private sub?: Subscription;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      senha: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      roles: ['USER'], // Geralmente o padrão de cadastro externo é USER e não ADMIN
    });
  }

  enviar() {
    if (this.formulario.invalid) return;

    this.sub = this.usuarioService.cadastrarUsuario(this.formulario.value).subscribe({
      next: () => {
        this.openModal('Cadastrado com sucesso! Agora você pode fazer login.', "Sucesso");
        this.router.navigate(['/conteudo/login']);
      },
      error: () => this.openModal('Erro ao cadastrar. Tente novamente.', "Erro")
    });
    this.formulario.reset();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  openModal(message: string, titulo: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.titulo = titulo;
  }
}