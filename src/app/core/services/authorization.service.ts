import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable }       from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '@core/models';
import { map } from 'rxjs/operators';
import { AppConstants } from '@core/app.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    loginSubject = new Subject<boolean>();
    tokenName = 'token';
    defaultExpire = 30 * 60;
    storage = localStorage;

    constructor(
            private httpClient: HttpClient,
            private router: Router,
            ) {}

    getToken(): any {
        if (this.storage[this.tokenName])
            return JSON.parse(this.storage[this.tokenName]);
        return null;
    }

    isLoggedIn(): boolean {
        //if (!environment.requireAuthen) return true;
        if (this.storage[this.tokenName]) {
            let token = this.getToken();
           
            // FIXME refresh token when expires
            if (token && token.expire) {
                let expire = new Date(token.expire);
                let current = new Date();
                if (current >= expire) {
                    //this.relogin();
                    return false;
                }else{
                    return true;
                }
            }
            //if (token) return true;
        }
        return false;
    }

    login(username: string, password: string, domain: string = ''): Observable<Token> {
        let data = {
            grant_type: 'password',
            username: encodeURIComponent(username),
            password: encodeURIComponent(password),
            domain: domain
            //client_id: '',  //TODO
            //client_secret: ''   //TODO
        };
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.httpClient.post<Token>(AppConstants.TOKEN_PATH, Object.keys(data).map(key=>key+"="+data[key]).join("&"), {headers})
        .pipe(
            map(token => {
                this.saveToken(token);
                this.isLogin(true);
                return token;
            })
        );
    }

    saveToken(obj: any): void {
        let token = new Token();
        token.token = obj['access_token'];
        token.expire = (new Date()).getTime() + (+obj['expires_in'] * 1000);
        token.refresh = obj['refresh_token'];

        this.storage.setItem(this.tokenName, JSON.stringify(token));
    }

    clearStorage(): void {
        Object.keys(this.storage).forEach(key => {
            this.storage.removeItem(key);
        });
    }

    logout(): void {
        this.clearStorage();
        this.isLogin(false);
    }

    isLogin(value: boolean) {
        this.loginSubject.next(value);
    }
}