import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { ThemeService } from '../@fury/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { SplashScreenService } from '../@fury/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from './core/services/cookie/cookie.service';
import { handleHttpResponseError } from './utils/handleHttpResponseError';
import { Languages } from 'src/constants';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private sidenavService: SidenavService,
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform,
    private route: ActivatedRoute,
    private splashScreenService: SplashScreenService,
    private translate: TranslateService,
    private cookieService: CookieService
  ) {
    try {
      this.route.queryParamMap
        .pipe(filter((queryParamMap) => queryParamMap.has('style')))
        .subscribe((queryParamMap) =>
          this.themeService.setStyle(queryParamMap.get('style'))
        );

      this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
      this.themeService.theme$.subscribe((theme) => {
        if (theme[0]) {
          this.renderer.removeClass(this.document.body, theme[0]);
        }

        this.renderer.addClass(this.document.body, theme[1]);
      });

      if (this.platform.BLINK) {
        this.renderer.addClass(this.document.body, 'is-blink');
      }

      this.sidenavService.addItems([
        {
          name: 'APPS',
          position: 1,
          type: 'subheading',
          customClass: 'first-subheading',
        },
        {
          name: 'Torre',
          routeOrFunction: '/',
          icon: 'dashboard',
          position: 2,
          pathMatchExact: true,
        },
        {
          name: 'Search Jobs',
          routeOrFunction: '/admin/jobs',
          icon: 'mouse',
          position: 3,
        },
        // {
        //   name: 'Search People',
        //   routeOrFunction: '/admin/people',
        //   icon: 'people',
        //   position: 4,
        // },
      ]);
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit(): void {
    this.translate.setDefaultLang(Languages.es);
    let lang: string = this.cookieService.getCookie('lang');
    if (lang == null) {
      lang = Languages.es;
    }
    this.translate.use(lang);
    this.cookieService.setCookie('lang', lang, null);
  }
}
