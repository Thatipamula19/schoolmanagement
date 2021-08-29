import { TestBed } from '@angular/core/testing';

import { AdiminGuard } from './adimin.guard';

describe('AdiminGuard', () => {
  let guard: AdiminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdiminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
