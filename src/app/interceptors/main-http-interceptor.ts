import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ModalComponent } from '../common/modal/modal.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class MainHttpInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const customRequest = request.clone();
    return next.handle(customRequest).pipe(catchError(this.erroHandler));
  }

  erroHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.ejemplo();
    }
    return throwError(error.message || 'server Error');
  }

  ejemplo() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        message: 'Ha ocurrido error',
        type: 'logout',
      },
      disableClose: true,
      width: '50%',
    });
  }
}
