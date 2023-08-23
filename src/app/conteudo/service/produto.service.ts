import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produto } from 'src/app/conteudo/model/produto';
import { Page } from 'ngx-pagination';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly API: string = 'http://localhost:8080/produtos';

  constructor(private httpClient: HttpClient) {}

  getListProdutos(page: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page-1)
    return this.httpClient
      .get(this.API, {params})
  }

  salvarProduto(formData: FormData): Observable<Produto> {
    if (!formData.has('file')) {
      formData.append('file', new Blob());
    }
    return this.httpClient
      .post(this.API, formData)
      .pipe((response: any) => response);
  }

  buscarProduto(busca: string, page: number): Observable<any> {
    const params = new HttpParams()
      .set('busca', busca)
      .set('page', page-1)
    return this.httpClient.get<any>(this.API+'/busca', { params });
  }
}
