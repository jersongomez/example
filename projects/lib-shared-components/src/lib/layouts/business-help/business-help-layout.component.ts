import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'lib-business-help-layout',
  templateUrl: './business-help-layout.component.html',
  styleUrls: ['./business-help-layout.component.scss'],
})
export class BusinessHelpLayoutComponent implements OnInit, AfterViewInit {
  @Input('imgbg') imgBg = '';
  @ViewChild('headerTitle', { static: false }) headerTitle: ElementRef<HTMLElement>;
  @ViewChild('navbar', { static: false }) navbar: ElementRef<HTMLElement>;
  @ViewChild('contentCard', { static: false }) contentCard: ElementRef<HTMLElement>;
  @ViewChild('bg', { static: false }) bg: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit() {}

  @HostListener('window:resize', [])
  onResize() {
    const heightBg =
      this.headerTitle.nativeElement.clientHeight +
      this.navbar.nativeElement.clientHeight +
      this.contentCard.nativeElement.clientHeight;
    this.bg.nativeElement.style.height = `${heightBg}px`;
  }

  ngAfterViewInit() {
    this.onResize();
  }
}
