import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { FinanceHttp } from './finance-http';

@Injectable()
export class LogoutService {

  tokensRevokeURL: string;

  constructor(
    private http: FinanceHttp,
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
