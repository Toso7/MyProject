import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private profileSub: Subscription | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.profileSub = this.authService.getProfile().subscribe(res => {
      this.authService.setUserProfile(res);
    });
  }

  ngOnDestroy(): void {
    if (this.profileSub) {
      this.profileSub.unsubscribe();
    }
  }

}
