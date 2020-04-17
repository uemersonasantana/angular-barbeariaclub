import {Component,Inject,Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {HttpInterceptor} from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import {GlobalConstants} from './global-constants';


import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    private baseUrl:string = GlobalConstants.API_URL;

    constructor(
        private router: Router,
        private Token: TokenService,
        private Auth: AuthService,
        public dialogRef: MatDialog
    ) {}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let token = localStorage.getItem('token');
        
        //const lanaguageInj= this.injector.get(RefreshToken2);
        
        if (token) {
            req = req.clone({
                setHeaders: {
                    'Authorization': 'Bearer '+token
                }
            } );
        }
            
        return next.handle(req).catch(err => {
            if (err.status === 401) {
                // Redireciona para login quando expirar a sessão.
                
                console.log('foi22')
                this.Token.remove();
                this.Auth.changeAuthStatus(false);
                this.dialogRef.closeAll();
                this.router.navigateByUrl('/login');
            }
            return Observable.throw(err);
        });
    }
}