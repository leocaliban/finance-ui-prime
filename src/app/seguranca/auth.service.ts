import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  oauthTokenURL: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.oauthTokenURL = `${environment.apiURL}/oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy'); // AuthorizationServerConfig API
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenURL, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
      }).catch(response => {
        if (response.status === 400) {
          if (response.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(response);
      });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  obterNovoAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy'); // AuthorizationServerConfig API
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenURL, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
        console.log('Novo access token');
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
