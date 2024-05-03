import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
          // Handle successful response
            const responseData = event.body;
            console.log("HERE")
            if (request.method.toLowerCase() != 'get') {
                
                  this.snackBar.open(responseData.message, 'Close', {
                      duration: 3000,
                      verticalPosition: 'top',
                      horizontalPosition: 'right'
                })
            }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400 && request.method.toLowerCase() !== 'get') {
          console.log(request.method)
          let errorMessage = 'An error occurred';
          if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
          } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
          } else if (error.error && typeof error.error === 'string') {
            errorMessage = error.error;
          }
          this.snackBar.open(errorMessage, 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
          });
        }
        return throwError(() => error);
      })
    );
  }
}