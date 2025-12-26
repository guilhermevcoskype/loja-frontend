import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { ProdutoService } from '../service/produto.service';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyMaskModule, FormsModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private produtoService = inject(ProdutoService);
  private modalService = inject(NgbModal);

  formulario!: any;
  selectedImage: string = '';
  selectedOption: 'arquivo' | 'url' = 'arquivo';
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      file: [null as File | null, [Validators.required]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      estoque: [null, [Validators.required, Validators.min(1), Validators.max(1000)]],
      preco: [null, [Validators.required, Validators.min(0.01)]],
      urlImagem: [{ value: '', disabled: true }],
      tipoProduto: ['', [Validators.required]],
      dataInsercao: [new Date()]
    });
  }

  onOptionChange() {
    const isArquivo = this.selectedOption === 'arquivo';
    const urlCtrl = this.formulario.get('urlImagem');
    const fileCtrl = this.formulario.get('file');

    if (isArquivo) {
      urlCtrl?.disable();
      urlCtrl?.setValue('');
      urlCtrl?.clearValidators();
      fileCtrl?.setValidators(Validators.required);
    } else {
      urlCtrl?.enable();
      urlCtrl?.setValidators([Validators.required, Validators.maxLength(200)]);
      fileCtrl?.clearValidators();
      fileCtrl?.setValue(null);
      if (this.fileInput) this.fileInput.nativeElement.value = '';
    }
    
    this.selectedImage = '';
    urlCtrl?.updateValueAndValidity();
    fileCtrl?.updateValueAndValidity();
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      const file = target.files[0];
      this.formulario.get('file')?.setValue(file);
      
      const reader = new FileReader();
      reader.onload = () => this.selectedImage = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  cadastrar() {
    if (this.formulario.invalid) {
      this.openModal("Verifique os campos obrigatórios.", "Erro");
      return;
    }

    const formData = new FormData();
    const rawValues = this.formulario.getRawValue();

    Object.entries(rawValues).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    this.produtoService.salvarProduto(formData).subscribe({
      next: () => {
        this.openModal("Produto cadastrado com sucesso!", "Sucesso");
        this.formulario.reset();
        this.selectedImage = '';
      },
      error: () => this.openModal("Erro ao salvar produto.", "Erro")
    });
  }

  openModal(message: string, titulo: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.titulo = titulo;
  }
}