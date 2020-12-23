import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  public user$: Observable<User> | undefined;
  private login: string | null | undefined;
  public myProfile = false;

  private userDetailSub: Subscription | undefined;

  constructor(private actRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      if (params.get('login') !== null) {
        this.login = params.get('login');
        this.user$ = this.userService.getUserDetail(params.get('login'));
        const loggedUser = this.authService.getLoggedInUser();
        if (loggedUser !== null && loggedUser.login === this.login){
          this.myProfile = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userDetailSub) {
      this.userDetailSub.unsubscribe();
    }
  }

}
