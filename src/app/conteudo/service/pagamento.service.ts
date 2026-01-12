import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PagamentoService {
  private environmentApi: string = environment.apiUrl + '/pagamento';

  constructor(private httpClient: HttpClient,
    private loginService: LoginService) {}
  pagarCompra(precoTotal: number): Observable<string> {
    const headers = new HttpHeaders().set("Authorization", "Bearer "+ this.loginService.getToken());
    const params = new HttpParams().set("pagamento", precoTotal.toString());
    return this.httpClient.post<string>(this.environmentApi, null, { headers, params });
  }
}
