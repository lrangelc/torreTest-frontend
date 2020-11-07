import { TestBed } from '@angular/core/testing';

import { MainRoutersService } from './main-routers.service';

describe('MainRoutersService', () => {
  let service: MainRoutersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainRoutersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
