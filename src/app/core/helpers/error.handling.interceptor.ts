import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthorizationService } from "@core/services";
import { catchError } from "rxjs/operators";
import { MessageService, LoadingService } from "@core/services";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
    constructor(private authService: AuthorizationService,
        private messageService: MessageService,
        private loadingService: LoadingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                let errMessage = '';
                if (error.error instanceof ErrorEvent) { // Client Side Error
                    errMessage = error.error.message;
                    this.messageService.error('Error', errMessage);
                } else { // Server Side Error
                    if (error.status == 401) {
                        // refresh token
                    }
                    if (error.error) {
                        if (error.error.error_description) // Auth Error
                            errMessage = error.error.error_description;
                            
                    }
                    if (!errMessage)
                        errMessage = error.message;
                        
                    this.messageService.error('Error ' + error.status, errMessage);
                }
                console.log(errMessage);
                this.loadingService.trigger(false);
                return throwError(errMessage);
            })
        )
    }
    
}