import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavItem } from './sidenav-item/sidenav-item.interface';
import { SidenavService } from './sidenav.service';
import { ThemeService } from '../../../@fury/services/theme.service';

import { AuthService } from './../../core/services/auth.service';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'fury-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  // sidenavUserVisible$ = this.themeService.config$.pipe(
  //   map((config) => config.sidenavUserVisible)
  // );
  // sidenavUserVisible$ = this.authService.isLoggedIn();
  // user = this.authService.isLoggedIn();
  sidenavUserVisible$ = false;
  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  @Input()
  @HostBinding('class.expanded')
  expanded: boolean;

  items$: Observable<SidenavItem[]>;
  user: { displayName; email };

  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.items$ = this.sidenavService.items$.pipe(
      map((items: SidenavItem[]) =>
        this.sidenavService.sortRecursive(items, 'position')
      )
    );
    if (this.authService.hasUser()) {
      // this.user = this.authService.getUser();
    } else {
    }

    // this.user = this.authService.isLoggedIn();
    // this.doSomething2();
    this.doSomething();
  }

  async doSomething() {
    const user = await this.authService.isLoggedIn();
    if (user) {
      // do something
      this.user = user;
      this.sidenavUserVisible$ = true;
    } else {
      // do something else
      this.sidenavUserVisible$ = false;
    }
  }

  doSomething2() {
    this.authService
      .isLoggedIn2()
      .pipe(
        tap((user) => {
          if (user) {
            // do something
            // if (user.displayName) {
            //   this.user.displayName = user.displayName;
            // }
            // if (user.email) {
            //   this.user.email = user.email;
            // }
            this.user = user;
            this.sidenavUserVisible$ = true;
          } else {
            // this.user.displayName = '';
            // this.user.email = '';
            this.sidenavUserVisible$ = false;
          }
        })
      )
      .subscribe();
  }

  toggleCollapsed() {
    this.sidenavService.toggleCollapsed();
  }

  @HostListener('mouseenter')
  @HostListener('touchenter')
  onMouseEnter() {
    this.sidenavService.setExpanded(true);
  }

  @HostListener('mouseleave')
  @HostListener('touchleave')
  onMouseLeave() {
    this.sidenavService.setExpanded(false);
  }

  ngOnDestroy() {}
}
