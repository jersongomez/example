import { Component, OnInit, Input } from '@angular/core';
import { Menu } from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() public labelHeader: string;

  @Input() public menu: Observable<Menu[]>;
  @Input() public logoHeader: string;
  @Input() public companyHeaderLogo: string;

  constructor() {}

  // constructor(private loginService: LoginService) {
  //   this.loginService.initSessionTimeout();
  // }

  ngOnInit() {}
}
