// tslint:disable-next-line: jsdoc-format
/**@ignore */ /** */
import { TestBed } from '@angular/core/testing';

import { CryptoService } from './crypto.service';

xdescribe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
