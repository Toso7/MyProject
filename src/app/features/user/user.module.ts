import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './user-list/user-list.component';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import {FormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [UserListComponent, UserDetailComponent, RepositoryListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'list'},
      {
        path: 'list',
        component: UserListComponent
      },
      { path: 'detail/:login',
        component: UserDetailComponent
      }
    ]),
    MatListModule,
    FormsModule,
    ScrollingModule
  ]
})
export class UserModule {
}
