import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser: any;
  private userLoggedIn: boolean;
  private userProfile$: BehaviorSubject<any>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.loggedInUser = null;
    this.userLoggedIn = false;
    this.userProfile$ = new BehaviorSubject<any>(null);
  }

  public getProfile(): Observable<any> {
    return this.http.get('https://api.github.com/user').pipe(
      map(
        res => {
          this.setLoggedInUser(res);
          this.setUserLoggedIn(true);
          return this.loggedInUser;
        }));
  }

  public logout(): void {
    this.setUserLoggedIn(false);
    localStorage.removeItem('access_token');
    this.setUserProfile(null);
    this.router.navigate(['home']);
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  setLoggedInUser(value: any): void {
    this.loggedInUser = value;
  }

  getUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  setUserLoggedIn(value: boolean): void {
    this.userLoggedIn = value;
  }


  getUserProfile(): Observable<any> {
    return this.userProfile$;
  }

  setUserProfile(value: any): void {
    this.userProfile$.next(value);
  }
}
