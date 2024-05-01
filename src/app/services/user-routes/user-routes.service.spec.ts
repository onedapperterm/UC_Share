import { TestBed } from '@angular/core/testing';

import { UserRoutesService } from './user-routes.service';

describe('UserRoutesService', () => {
  let service: UserRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
