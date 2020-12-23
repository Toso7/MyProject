import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './../user.service';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  @Input()
  public login: string | undefined;

  public users$: Observable<User[]> | undefined;
  public user: User | undefined;

  public search = '';

  public pageSize = 100;
  public page = 1;
  public length: number | undefined;

  public orderFollowers = 0;
  public orderRepos = 0;
  public orderJoined = 0;

  private mapOrderBy: any;
  private lengthSubs: Subscription | undefined;

  constructor(private userService: UserService,
              private cd: ChangeDetectorRef,
              private router: Router) {
    this.search = 'Bratislava';
    this.mapOrderBy = {1: 'asc', 2: 'desc', 0: null};
  }

  ngOnInit(): void {
    // followers
    if (this.login !== undefined) {
      this.lengthSubs = this.userService.getFollowersCount(this.login).subscribe(res => {
        if (res != null && res !== undefined) {
          this.length = res;
        }
      });
      this.users$ = this.userService.getFollowers(this.login, this.pageSize, this.page);
    } // users
    else {
      this.lengthSubs = this.userService.searchGetLength(this.search).subscribe(res => {
        if (res != null) {
          this.length = res;
        }
      });
      this.users$ = this.userService.searchByLocation(this.search, this.pageSize, this.page);
    }
  }

  ngOnDestroy(): void {
    if (this.lengthSubs) {
      this.lengthSubs.unsubscribe();
    }
  }

  onSelect(user: User): void {
    if (user != null && user !== undefined) {
      this.router.navigate(['/user/detail', user.login]);
    }
  }

  searchUsersResults(): void {

    this.orderFollowers = -1;
    this.orderRepos = -1;
    this.orderJoined = -1;

    if (!this.search) {
      this.users$ = undefined;
    } else {
      if (this.search.length > 3) {
        this.users$ = this.userService.searchByLocation(this.search, this.pageSize, this.page);
      }
    }
  }

  sortFollowers(): void {

    this.orderFollowers++;
    this.orderRepos = 0;
    this.orderJoined = 0;

    const orderBy = this.mapOrderBy[this.orderFollowers];

    if (orderBy != null) {
      this.users$ = this.userService.searchByLocationSort(this.search, this.pageSize, this.page, 'followers', orderBy);
    } else {
      this.orderFollowers = 0;
    }
  }

  sortRepos(): void {
    this.orderFollowers = 0;
    this.orderRepos++;
    this.orderJoined = 0;

    const orderBy = this.mapOrderBy[this.orderRepos];

    if (orderBy != null) {
      this.users$ = this.userService.searchByLocationSort(this.search, this.pageSize, this.page, 'repositories', orderBy);
    } else {
      this.orderRepos = 0;
    }
  }

  sortJoined(): void {
    this.orderFollowers = 0;
    this.orderRepos = 0;
    this.orderJoined++;
    const orderBy = this.mapOrderBy[this.orderJoined];

    if (orderBy != null) {
      this.users$ = this.userService.searchByLocationSort(this.search, this.pageSize, this.page, 'joined', orderBy);
    } else {
      this.orderJoined = 0;
    }
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;

    // followers
    if (this.login !== undefined) {
      this.users$ = this.userService.getFollowers(this.login, this.pageSize, this.page);

    } // users
    else {

      let orderBy: string;

      if (this.orderFollowers !== 0) {
        orderBy = this.mapOrderBy[this.orderFollowers];
        if (orderBy != null) {
          this.users$ = this.userService.searchByLocationSort(this.search, this.pageSize, this.page, 'followers', orderBy);
        }
      } else if (this.orderRepos !== 0) {
        orderBy = this.mapOrderBy[this.orderRepos];
        if (orderBy != null) {
          this.users$ = this.userService.searchByLocationSort(this.search, this.pageSize, this.page, 'repositories', orderBy);
        }
      } else if (this.orderJoined !== 0) {
        orderBy = this.mapOrderBy[this.orderJoined];
        if (orderBy != null) {
          this.users$ = this.userService.searchByLocationSort(this.search, this.pageSize, this.page, 'joined', orderBy);
        }
      } else {
        this.users$ = this.userService.searchByLocation(this.search, this.pageSize, this.page);
      }
    }
  }
}
