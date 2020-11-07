// tslint:disable-next-line: jsdoc-format
/**@ignore */ /** */
import { TestBed } from '@angular/core/testing';

import { CookieService } from './cookie.service';

xdescribe('CookieService', () => {
  let service: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
