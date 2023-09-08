import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagamentoService {
  private readonly API: string = 'http://localhost:8080/pagamento';

  constructor(private httpClient: HttpClient) {}
  pagarCompra(precoTotal: number): Observable<string> {
    const params = new HttpParams().set('pagamento', precoTotal.toString());
    return this.httpClient.post<string>(this.API, null, {params});
  }
}
