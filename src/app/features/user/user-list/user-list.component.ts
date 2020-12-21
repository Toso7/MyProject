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

  constructor(private userService: UserService,
              private cd: ChangeDetectorRef,
              private router: Router) {
    this.search = 'Bratislava';
  }

  ngOnInit(): void {
    if (this.login !== undefined) {
      this.users$ = this.userService.getFollowers(this.login);
    }
    else{
      this.users$ = this.userService.searchByLocation(this.search, 100, 1);
    }
  }

  onSelect(user: User): void {
    if (user != null && user !== undefined) {
      this.router.navigate(['/user/detail', user.login]);
    }
  }

  searchUsersResults(): void {
    if (!this.search) {
      this.users$ = undefined;
    } else {
      if (this.search.length > 3) {
        this.users$ = this.userService.searchByLocation(this.search, 100, 1);
      }
    }
  }
}
