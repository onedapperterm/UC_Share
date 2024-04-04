import { TestBed } from '@angular/core/testing';

import { FirestoreDatabaseService } from './firestore-database.service';

describe('FirestoreDatabaseService', () => {
  let service: FirestoreDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
