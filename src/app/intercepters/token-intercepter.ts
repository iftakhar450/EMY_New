import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public toastr: ToastrManager, private spinner: NgxSpinnerService, private router: Router) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: localStorage.getItem('authorized') || '',
            }
        });
        return next.handle(request).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if (evt.status === 200) {
                        this.spinner.hide();
                        // this.toastr.successToastr(evt.body.msg, 'Success!');
                    }
                }
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    console.log(err);
                    this.spinner.hide();
                    try {
                        if (err.status === 403) {
                            this.router.navigate(['']);
                             this.toastr.errorToastr(err.error.error, 'Oops!');
                        } else if (err.error.msg) {
                            this.toastr.errorToastr(err.error.msg, 'Oops!');
                        } else if (err.error.statusText) {
                            this.toastr.errorToastr(err.error.statusText, 'Oops!');
                        } else if (err.error.error) {
                             this.toastr.errorToastr(err.error.error, 'Oops!');
                        } else {
                             this.toastr.errorToastr(err.error, 'Oops!');
                        }

                    } catch (e) {
                        this.toastr.errorToastr('Error ccurred', 'Oops!');
                    }
                }
                return of(err);
            }));
    }
}
