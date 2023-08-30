import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/conteudo/model/produto';

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

  buscarProdutoPorCodigo(codigo: number): Observable<Produto> {
    return this.httpClient.get<Produto>(this.API+'/'+codigo);
  }

  buscarTiposProduto(): Observable<any>{
    return this.httpClient.get(this.API+'/tipoProduto');
  }

  buscarProdutoPorTipo(tipoProduto: string, page: number): Observable<any>{
    const params = new HttpParams()
      .set('tipoProduto', tipoProduto)
      .set('page', page-1)
    return this.httpClient.get<any>(this.API+'/buscarProdutoPorTipo', { params });
  }
}
