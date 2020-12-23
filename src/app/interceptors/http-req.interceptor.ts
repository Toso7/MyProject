import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.handle(request, next));
  }

  // tslint:disable-next-line:typedef
  async handle(request: HttpRequest<any>, next: HttpHandler) {


    if (!request.url.includes(environment.gatekeeperConfig.gatekeeper)
      && localStorage.getItem('access_token') !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: 'token ' + localStorage.getItem('access_token')
        }
      });
    }

    // Important: Note the .toPromise()
    return next.handle(request).toPromise();
  }
}
