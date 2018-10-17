import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  oauthTokenURL = 'http://localhost:8080/oauth/token';

  constructor(
    private http: Http
  ) { }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy'); // AuthorizationServerConfig API
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenURL, body, { headers })
      .toPromise()
      .then(response => {
        console.log(response);
      }).catch(response => {
        console.log(response);
      });
  }
}
