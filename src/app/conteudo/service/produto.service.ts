import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produto } from 'src/app/conteudo/model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API: string = 'http://localhost:8080/produtos';

  constructor(private httpClient: HttpClient) { }

  getListProdutos(): Observable<Array<Produto>> {
    return this.httpClient.get(this.API).pipe((response : any) => response);
  }
}
