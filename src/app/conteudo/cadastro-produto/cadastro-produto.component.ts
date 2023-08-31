import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';
import { UsuarioService } from '../service/usuario.service';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css'],
})
export class CadastroProdutoComponent implements OnInit {
  formulario!: FormGroup;
  selectedImage!: string;
  imageLink!: string;
  produto: Produto = new Produto();
  formData: FormData = new FormData();
  selectedOption: string = 'arquivo';
  formControlExample = new FormControl(20);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private produtoService: ProdutoService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      file: [{ value: null, disabled: false }, Validators.required],
      descricao: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],

      estoque: [

        Validators.compose([Validators.required, Validators.min(1), Validators.max(1000), Validators.pattern('^[0-9]*$')]),
      ],

      preco: ['',Validators.compose([Validators.required, Validators.min(1),Validators.pattern(/^-?\d+(\.\d+)?$/)])],

      dataInsercao: [new Date()],

      urlImagem: [{ value: '', disabled: true }],

      tipoProduto: ['', Validators.compose([Validators.required])],
    });
  }

  onFileChange(event?: Event) {
    if (event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length) {
        const file = target.files[0];
        this.formulario.get('file')?.setValue(file);
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    } else this.fileInput.nativeElement.value = '';
  }

  onOptionChange() {
    if (this.selectedOption == 'arquivo') {
      this.formulario.get('urlImagem')?.disable();
      this.fileInput.nativeElement.disabled = false;
      this.formulario.get('urlImagem')?.clearValidators();
      this.formulario.get('urlImagem')?.setValue('');
      this.formulario.get('file')?.setValidators(Validators.required);
      this.selectedImage = '';
    } else {
      this.onFileChange();
      this.fileInput.nativeElement.disabled = true;
      this.formulario.get('urlImagem')?.enable();
      this.formulario
        .get('urlImagem')
        ?.setValidators(
          Validators.compose([Validators.maxLength(200), Validators.required])
        );
      this.formulario.get('file')?.clearValidators();
      this.formulario.get('file')?.setValue(null);
      this.selectedImage = '';
    }
    this.formulario.get('urlImagem')?.updateValueAndValidity();
    this.formulario.get('file')?.updateValueAndValidity();
  }

  cadastrar() {
    if (this.formulario.valid) {
      Object.entries(this.formulario.getRawValue()).forEach(([key, value]) => {
        if (value != null) {
          if (value instanceof File) {
            this.formData.append(key, value, value.name);
          } else {
            this.formData.append(key, (value as string | Blob).toString());
          }
        }
      });
      this.produtoService.salvarProduto(this.formData).subscribe({
        next: (response) => {
          this.openModal("Cadastrado com sucesso");
        },
        error: (erro) => {
          console.log(erro);
          this.openModal("Ocorreu um erro, favor contactar o dev.")
        },
      });
      this.formData = new FormData();
      this.formulario.reset();
    }else{
      this.openModal("Há algum campo errado: "+this.formulario.errors)

    }
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
  }

}
