import { TestBed } from '@angular/core/testing';

import { UserTripsService } from './user-trips.service';

describe('UserTripsService', () => {
  let service: UserTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
