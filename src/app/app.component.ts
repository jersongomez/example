import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(protected auth: AuthService) {
    this.auth.isTokenExpired();
  }

  ngOnInit() {}
}
