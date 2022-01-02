import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable }       from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '@core/models';
import { LoadingService, MessageService } from '@core/services';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    loginSubject = new Subject<boolean>();
    loginUrl = '/authenapi/token'; 
    reloginUrl = '/authenapi/token';
    loginPage = '/login';
    tokenName = 'token';
    defaultExpire = 30 * 60;
    redirectUrlName = 'redirectUrl';
    defaultRedirectUrl = '/home';
    storage = localStorage;
    result = new Subject();

    constructor(
            private httpClient: HttpClient,
            private router: Router,
            private loadingService: LoadingService,
            private messageService: MessageService,
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

    forwardToLogin(url): void {
        this.storage.setItem(this.redirectUrlName, url);
        this.router.navigate([this.loginPage]);
    }

    login(username: string, password: string, domain: string = ''): Subject<any> {
        this.loadingService.trigger(true);
        let data = {
            grant_type: 'password',
            username: encodeURIComponent(username),
            password: encodeURIComponent(password),
            domain: domain
            //client_id: '',  //TODO
            //client_secret: ''   //TODO
        };
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.httpClient.post<Token>(this.loginUrl, Object.keys(data).map(key=>key+"="+data[key]).join("&"), {headers})
        .subscribe(
            (data) => {
                this.saveToken(data);
                this.isLogin(true);
                this.result.next(data);
            },
            (err) => {
                this.loadingService.trigger(false);
                this.messageService.error('Error', 'Error occured, Please contact administrator.');
                return this.result.next(false);
            },
            () => {
                this.loadingService.trigger(false);
            });

        return this.result;
    }

    saveToken(obj: any): void {
        let token = new Token();
        token.token = obj['access_token'];
        token.expire = (new Date()).getTime() + (+obj['expires_in'] * 1000);
        token.refresh = obj['refresh_token'];

        this.storage.setItem(this.tokenName, JSON.stringify(token));
    }

    getRedirectUrl(): string {
        let redirectUrl = this.storage[this.redirectUrlName];
        if (redirectUrl && redirectUrl != 'undefined') {
            this.storage.removeItem(this.redirectUrlName);
            return redirectUrl;
        }
        return this.defaultRedirectUrl;
    }

    clearStorage(): void {
        Object.keys(this.storage).forEach(key => {
            this.storage.removeItem(key);
        });
    }

    logout(): void {
        this.clearStorage();
        this.isLogin(false);
        this.forwardToLogin('');
    }

    relogin(): void {
        let token = this.getToken();
        if (!token) {
            console.log('Relogin: not found token');
            this.logout();
            this.isLogin(false);
            return;
        }
        let data = 'scope=offline_access&grant_type=refresh_token&refresh_token=' + token['refresh'];
        const headers = new HttpHeaders({ 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token['token']
        });

        this.httpClient.post(this.reloginUrl, data, {headers})
        .subscribe(
            (res) => {
                this.saveToken(res);
                this.isLogin(true);
            },
            (err) => {
                this.logout();
                this.isLogin(false);
            });
    }

    isLogin(value: boolean) {
        this.loginSubject.next(value);
    }
}