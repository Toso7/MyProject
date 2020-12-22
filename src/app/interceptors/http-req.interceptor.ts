import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {from, Observable} from 'rxjs';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.handle(request, next));
  }

  // tslint:disable-next-line:typedef
  async handle(request: HttpRequest<any>, next: HttpHandler) {


    request = request.clone({
      setHeaders: {
        Authorization: `Basic dG9tYXMuYmFyYW5pYWtAZ21haWwuY29tOiAyMzA1NTk3MzMxMjY2ZmJjNjdmMjhhNWMxOWUyODEwZTRkMjA3NThhIA==`,
        Accept: `application/vnd.github.v3+json`
      }
    });

    // Important: Note the .toPromise()
    return next.handle(request).toPromise();
  }
}
