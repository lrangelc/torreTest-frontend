import { TestBed } from '@angular/core/testing';

import { AppliedJobsService } from './applied-jobs.service';

describe('AppliedJobsService', () => {
  let service: AppliedJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppliedJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
