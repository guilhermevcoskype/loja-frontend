import { environment } from './../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/conteudo/model/produto';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private environmentApi: string = environment.apiUrl + '/produtos';

  constructor(private httpClient: HttpClient,
    private loginService: LoginService) {}

  getListProdutos(page: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page-1)
    return this.httpClient
      .get(this.environmentApi, {params})
  }

  salvarProduto(formData: FormData): Observable<Produto> {
    const headers = new HttpHeaders().set("Authorization", "Bearer "+ this.loginService.getToken());
    if (!formData.has('file')) {
      formData.append('file', new Blob());
    }
    return this.httpClient.post(this.environmentApi, formData, {headers})
      .pipe((response: any) => response);
  }

  buscarProduto(busca: string, page: number): Observable<any> {
    const params = new HttpParams()
      .set('busca', busca)
      .set('page', page-1)
    return this.httpClient.get<any>(this.environmentApi+'/busca', { params });
  }

  buscarProdutoPorCodigo(codigo: number): Observable<Produto> {
    return this.httpClient.get<Produto>(this.environmentApi+'/'+codigo);
  }

  buscarTiposProduto(): Observable<any>{
    return this.httpClient.get(this.environmentApi+'/tipoProduto');
  }

  buscarProdutoPorTipo(tipoProduto: string, page: number): Observable<any>{
    const params = new HttpParams()
      .set('tipoProduto', tipoProduto)
      .set('page', page-1)
    return this.httpClient.get<any>(this.environmentApi+'/buscarProdutoPorTipo', { params });
  }
}
