import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  accessToken: any;

  constructor(private actRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    const code = this.actRoute.snapshot.queryParamMap.get('code');

    if (code) {
      this.getToken(code).subscribe(res => {
        this.router.navigate(['home']);
      });
    }

  }

  public getToken(code: string): Observable<any> {
    this.accessToken = this.http.get(environment.gatekeeperConfig.gatekeeper + '/authenticate/' + code)
      .pipe(
        map(res => {
          if (res && 'token' in res) {
            this.accessToken = res;
            localStorage.setItem('access_token', this.accessToken.token);
            return {authenticated: true};
          } else {
            localStorage.removeItem('access_token');
            return {authenticated: false};
          }
        }));

    return this.accessToken;
  }


}
