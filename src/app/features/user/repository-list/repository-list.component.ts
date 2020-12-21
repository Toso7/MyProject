import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../user.service';
import {Repository} from '../../../model/repository';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {
  @Input()
  public login: string | undefined;

  public repositories$: Observable<Repository[]> | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.login !== undefined) {
      this.repositories$ = this.userService.getRepositories(this.login);
    }
  }

}
