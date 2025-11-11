import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/conteudo/model/produto';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly API: string = 'http://localhost:8080/produtos';
  //private readonly API: string = 'http://loja-backend:8080/produtos';

  constructor(private httpClient: HttpClient,
    private loginService: LoginService) {}

  getListProdutos(page: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page-1)
    return this.httpClient
      .get(this.API, {params})
  }

  salvarProduto(formData: FormData): Observable<Produto> {
    const headers = new HttpHeaders().set("Authorization", "Bearer "+ this.loginService.getToken());
    if (!formData.has('file')) {
      formData.append('file', new Blob());
    }
    return this.httpClient.post(this.API, formData, {headers})
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
