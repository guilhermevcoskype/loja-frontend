import { Injectable, signal, computed, effect } from '@angular/core';
import { CarrinhoItem } from '../model/carrinhoItem';
import { ProdutoService } from './produto.service';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  // Signal que armazena a lista de itens
  private itensSignal = signal<CarrinhoItem[]>([]);

  // Signals computados (leitura automática)
  readonly itens = this.itensSignal.asReadonly();
  readonly quantidadeTotal = computed(() => 
    this.itensSignal().reduce((total, item) => total + item.quantidade, 0)
  );
  readonly precoTotal = computed(() => 
    this.itensSignal().reduce((total, item) => total + (item.produto.preco * item.quantidade), 0)
  );

  constructor() {
    this.carregarDados();
    
    // Efeito para salvar no sessionStorage sempre que o signal mudar
    effect(() => {
      sessionStorage.setItem('itens', JSON.stringify(this.itensSignal()));
    });
  }

  aumentarQuantidadeItem(item: CarrinhoItem) {
    this.itensSignal.update(lista => {
      const index = lista.findIndex(i => i.produto.id === item.produto.id);
      if (index > -1) {
        lista[index].quantidade++;
        return [...lista];
      }
      item.quantidade = 1;
      return [...lista, item];
    });
  }

  diminuirQuantidadeItem(item: CarrinhoItem) {
    this.itensSignal.update(lista => {
      const index = lista.findIndex(i => i.produto.id === item.produto.id);
      if (index > -1) {
        if (lista[index].quantidade > 1) {
          lista[index].quantidade--;
        } else {
          lista.splice(index, 1);
        }
      }
      return [...lista];
    });
  }

  private carregarDados() {
    const dados = sessionStorage.getItem('itens');
    if (dados) {
      const objetos = JSON.parse(dados);
      this.itensSignal.set(objetos.map((obj: any) => CarrinhoItem.fromObject(obj)));
    }
  }
  removerItem(item: CarrinhoItem) {
    this.itensSignal.update(lista => {
      // Filtra a lista para manter apenas os itens que NÃO são o que queremos remover
      const novaLista = lista.filter(i => i.produto.id !== item.produto.id);
      return novaLista;
    });
    // O effect que criamos no constructor cuidará de salvar no sessionStorage automaticamente
  }

  // É útil ter um método para limpar tudo após o pagamento
  limparCarrinho() {
    this.itensSignal.set([]);
    sessionStorage.removeItem('itens');
  }
}