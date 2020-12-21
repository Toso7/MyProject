import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserService} from './../user.service';
import {Observable} from 'rxjs';
import {User} from '../../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input()
  public login: string | undefined;

  public users$: Observable<User[]> | undefined;
  public user: User | undefined;

  public search = '';

  public pageSize = 100;
  public page = 1;

  public orderFollowers = - 1;
  public orderRepos = - 1;
  public orderJoined = - 1;

  constructor(private userService: UserService,
              private cd: ChangeDetectorRef,
              private router: Router) {
    this.search = 'Bratislava';
  }

  ngOnInit(): void {
    if (this.login !== undefined) {
      this.users$ = this.userService.getFollowers(this.login);
    } else {
      this.users$ = this.userService.searchByLocation(this.search, this.pageSize, this.page);
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
    this.orderRepos = -1;
    this.orderJoined = -1;

    const orderBy = (this.orderFollowers === 0) ? 'asc' : (this.orderFollowers === 1) ? 'desc' : null;

    if (orderBy != null) {
      this.users$ = this.userService.searchByLocationSort(this.search, this.pageSize, this.page, 'followers', orderBy);
    } else {
      this.orderFollowers = -1;
    }
  }

  sortRepos(): void {
    this.orderFollowers = -1;
    this.orderRepos++;
    this.orderJoined = -1;

    const orderBy = (this.orderRepos === 0) ? 'asc' : (this.orderRepos === 1) ? 'desc' : null;

    if (orderBy != null) {
      this.users$ = this.userService.searchByLocationSort(this.search, this.pageSize, this.page, 'repositories', orderBy);
    } else {
      this.orderRepos = -1;
    }
  }

  sortJoined(): void {
    this.orderFollowers = -1;
    this.orderRepos = -1;
    this.orderJoined++;
    const orderBy = (this.orderJoined === 0) ? 'asc' : (this.orderJoined === 1) ? 'desc' : null;

    if (orderBy != null) {
      this.users$ = this.userService.searchByLocationSort(this.search, this.pageSize, this.page, 'joined', orderBy);
    } else {
      this.orderJoined = -1;
    }
  }
}
