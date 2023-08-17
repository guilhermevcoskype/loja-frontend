import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produto } from 'src/app/conteudo/model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API: string = 'http://localhost:8080/produtos';

  constructor(private httpClient: HttpClient) { }

  getListProdutos(): Observable<Array<Produto>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    const options = { headers: headers };
    return this.httpClient.get(this.API, options).pipe((response : any) => response);
  }
}
