import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Repository} from '../../model/repository';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) {
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUserDetail(login: string | null): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/` + login);
  }

  getFollowers(login: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/users/` + login + `/followers`);
  }

  getRepositories(login: string): Observable<Repository[]> {
    return this.httpClient.get<Repository[]>(`${environment.apiUrl}/users/` + login + `/repos`);
  }

  searchByLocation(location: string, pageSize: number, page: number): Observable<User[]> {
    return this.httpClient.get<any>(`${environment.apiUrl}/search/users?q=location:` +
      location + `&page=` + page + `&per_page=` + pageSize).pipe(
      map(
        res => {
          if (res.items != null && res.total_count > 0){
            return res.items;
          }
          else{
            return null;
          }
        }
      )
    );
  }
}
