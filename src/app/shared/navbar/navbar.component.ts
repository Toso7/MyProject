import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' +
    environment.gatekeeperConfig.client_id + '&scope=user&redirect_uri=' +
    environment.gatekeeperConfig.redirect_uri;

  public userLogin: string | null;
  private profileSub: Subscription | undefined;

  constructor(public authService: AuthService,
              private router: Router) {
    this.userLogin = null;
  }

  ngOnInit(): void {
    this.profileSub = this.authService.getUserProfile().subscribe(
      res => {
        if (res) {
          this.userLogin = res.login;
        } else {
          this.userLogin = null;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.profileSub) {
      this.profileSub.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }

  loggedUserDetail(): void {
    this.router.navigate(['/user/detail', this.userLogin]);
  }
}
