import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-standard-size-layout',
  templateUrl: './standard-size-layout.component.html',
  styleUrls: ['./standard-size-layout.component.scss'],
})
export class StandardSizeLayoutComponent implements OnInit {
  @Input('size') public size = 'md';

  constructor() {}

  ngOnInit() {}
}
