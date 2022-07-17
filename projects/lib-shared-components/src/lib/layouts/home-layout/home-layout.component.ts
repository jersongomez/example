import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'lib-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit, AfterViewInit {
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
