import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-light-home-layout',
  templateUrl: './light-home-layout.component.html',
  styleUrls: ['./light-home-layout.component.scss'],
})
export class LightHomeLayoutComponent implements OnInit {
  @Input()
  backUrl: string = '';

  @Input()
  bannerBackground: string = '';

  @Input('logoPartner') logoPartner = '';
  @Input('logoWhitePartner') logoWhitePartner = '';
  @Input('logoSantander') logoSantander = '';
  @Input('logoWhiteSantander') logoWhiteSantander = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  public getImg(typeImg: string | string[], sanitize: boolean = true) {
    if (Array.isArray(typeImg)) {
      const variables = [];
      typeImg.forEach((element) => {
        variables.push(this.getImg(element, false));
      });
      return this.sanitizer.bypassSecurityTrustStyle(variables.join(';'));
    }

    let varName = '';
    let varValue = '';

    switch (typeImg) {
      case 'bannerBackground':
        varName = '--banner-background';
        varValue = this.bannerBackground;
        break;
      case 'logoPartner':
        varName = '--logo-partner';
        varValue = this.logoPartner;
        break;
      case 'logoWhitePartner':
        varName = '--logo-white-partner';
        varValue = this.logoWhitePartner;
        break;
      case 'logoSantander':
        varName = '--logo-santander';
        varValue = this.logoSantander;
        break;
      case 'logoWhiteSantander':
        varName = '--logo-white-santander';
        varValue = this.logoWhiteSantander;
        break;
    }

    const result = `${varName}:url(${varValue})`;
    return sanitize ? this.sanitizer.bypassSecurityTrustStyle(result) : result;
  }
}
