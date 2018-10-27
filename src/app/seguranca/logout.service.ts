import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from './../../environments/environment';

@Injectable()
export class LogoutService {

  tokensRevokeURL: string;

  constructor(
    private http: AuthHttp,
    private authService: AuthService
  ) {
    this.tokensRevokeURL = `${environment.apiURL}/tokens/revoke`;
   }

  logout() {
    return this.http.delete(this.tokensRevokeURL, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.authService.limparAccessToken();
      });
  }

}
