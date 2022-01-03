import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthorizationService } from "@core/services";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthorizationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isLoggedIn()) {
            const token = this.authService.getToken();
            req = req.clone({
                setHeaders: {
                  Authorization: 'Bearer ' + token.token
                }
            });
        }

        return next.handle(req);
    }
    
}