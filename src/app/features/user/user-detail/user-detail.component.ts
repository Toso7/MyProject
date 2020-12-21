import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  public user$: Observable<User> | undefined;
  private login: string | null | undefined;

  private userDetailSub: Subscription | undefined;

  constructor(private actRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      if (params.get('login') !== null) {
        this.user$ = this.userService.getUserDetail(params.get('login'));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userDetailSub) {
      this.userDetailSub.unsubscribe();
    }
  }

}
