import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss'],
})
export class ToolbarUserComponent implements OnInit {
  sidenavUserVisible$ = false;
  isOpen: boolean;
  user: { displayName; email };

  constructor(
    private auth: AuthService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
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

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  appliedJobs() {
    this.router.navigate(['/admin/appliedJobs']);
  }
}
