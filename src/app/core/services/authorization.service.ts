import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject, Observable, of, Subject } from 'rxjs';
import { Injectable }       from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '@core/models/token'
//import { LoadingService } from '../loading/loading.service'
//import { environment } from '../../../../environments/environment';
//import { MessageService } from 'primeng/components/common/messageservice';
//import { LoginEventService } from '../../../service/login.event.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    user: any;
    permissions: any;
    userPermissions = new ReplaySubject(1);
    authorizationTable = new ReplaySubject(1);

    loginUrl = '/authenApi/token'; 
    reloginUrl = '/authenApi/token';
    loginPage = '/login';
    tokenName = 'token';
    defaultExpire = 30 * 60;
    redirectUrlName = 'redirectUrl';
    defaultRedirectUrl = '/home';
    loginStatus = false;
    storage = localStorage;
    result = new Subject();

    constructor(
            private httpClient: HttpClient,
            private router: Router,
            //private loadingService: LoadingService,
            //private messageService: MessageService,
            //private loginEventService: LoginEventService
            ) {
        // this.store.select('currentUser').pipe(
        //     filter(val=>val != undefined && val != null)
        // ).subscribe((data: ICurrentUser) => {
        //     if (data.user) {
        //         this.user = data.user;
        //         this.permissions = data.permissions;
        //         console.log("User permission");
        //         console.log(this.permissions);
        //         this.userPermissions.next(this.permissions);
        //         this.httpClient.get('model/authorization.json').subscribe(res=>{
        //             this.authorizationTable.next(res);
        //         });
        //     }
        // });
    }

    hasAuthorizeForPath(path: String): Observable<boolean> {
        console.log("Path " + path);
        return Observable.create(obs => {
            this.authorizationTable.subscribe((value: any) => {
                let authorize = value.filter(it => it.type === "path" && path.includes(it.action));
                if (authorize.length == 0) {
                    console.log("Check user for permission on: " + path, true);
                    obs.next(true);
                    return;
                }
                this.userPermissions.subscribe((userPermissins: any) => {
                    if (authorize.some(it => userPermissins.includes(it.require))) {
                        console.log("Check user for permission on: " + path, true);
                        obs.next(true);
                        return;
                    }
                    console.log("Check user for permission on: " + path, false);
                    obs.next(false);
                });
            })
        });
    }

    hasAuthorizeForPermission(permission: String): Observable<boolean> { 
        if (!permission) {
            console.log("Check user for permission on: " + permission, true);
            return of(true);
        }

        return Observable.create(obs => {
            this.userPermissions.subscribe((userPermissins: any) => {
                let per = userPermissins.some(p=> p.startsWith(permission))
                console.log("Check user for permission on: " + permission, per);
                obs.next(per);
            });
        });
    }

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

    login(username: string, password: string, domain: string): Subject<any> {
        //this.loadingService.trigger(true);
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
                //Add by pat.partithammatorn 23/09/2019
                if(JSON.parse(localStorage.getItem('userInfoSSO')) != null)
                    this.clearStorage();
                //End add by pat.partithammatorn 23/09/2019

                this.saveToken(data);
                //this.loginEventService.isLogin(true);
                this.result.next(data);
            },
            (err) => {
                let errorMessage = {severity:'error', summary:'Error', detail: 'Error occured, Please contact administrator.'};
                try {
                    if (err.error && err.error.error_description){
                        errorMessage.detail = err.error.error_description;
                    }
                }catch(e) {

                }
                //this.loadingService.trigger(false);
                //this.messageService.add(errorMessage);
                this.result.next(false);
            },
            () => {
                //this.loadingService.trigger(false);
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
        //this.loginEventService.isLogin(false);
        this.forwardToLogin('');
    }

    relogin(): void {
        let token = this.getToken();
        if (!token) {
            console.log('Relogin: not found token');
            this.logout();
            //this.loginEventService.isLogin(false);
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
                //this.loginEventService.isLogin(true);
            },
            (err) => {
                this.logout();
                //his.loginEventService.isLogin(false);
            });
    }
}