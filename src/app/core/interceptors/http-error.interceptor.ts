import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ModalService } from "../services/modal.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    
    constructor
    (
        private readonly modalService: ModalService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage: string = '';
                console.log(JSON.stringify(error));

                if(error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // server-side error 
                    errorMessage = `Error Code: ${error.status}
                    \nStatus Text: ${error.statusText}
                    \nMessage: ${error.error.message}`

                    this.modalService.changeMessage(error.error.message);
                }

                // window.alert(errorMessage);
                return throwError(errorMessage);
            }) 
        ) as Observable<HttpEvent<any>>;
    }
}