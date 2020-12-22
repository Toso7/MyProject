import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../user.service';
import {Repository} from '../../../model/repository';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit, OnDestroy {
  @Input()
  public login: string | undefined;

  public repositories$: Observable<Repository[]> | undefined;

  public pageSize = 100;
  public page = 1;
  public length: number | undefined;

  private lengthSubs: Subscription | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.login !== undefined) {
      this.lengthSubs = this.userService.getRepositoriesCount(this.login).subscribe(res => {
        if (res != null && res !== undefined){
          this.length = res;
        }
      });
      this.repositories$ = this.userService.getRepositories(this.login, this.pageSize, this.page);
    }
  }

  ngOnDestroy(): void {
    if (this.lengthSubs){
      this.lengthSubs.unsubscribe();
    }
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;

    if (this.login !== undefined) {
      this.repositories$ = this.userService.getRepositories(this.login, this.pageSize, this.page);
    }
  }
}
