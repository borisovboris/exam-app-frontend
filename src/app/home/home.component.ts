import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  occupation$!: Observable<any>;
  
  constructor
  (
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public ngOnInit() {
    this.occupation$ = this.authService.getUserOccupation().pipe(shareReplay());
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['random-url-to-refresh-the-page']).then(() => { this.router.navigate(['/home']); })
  }

}
