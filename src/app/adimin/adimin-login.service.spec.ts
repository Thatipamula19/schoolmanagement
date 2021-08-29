import { TestBed } from '@angular/core/testing';

import { AdiminLoginService } from './adimin-login.service';

describe('AdiminLoginService', () => {
  let service: AdiminLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdiminLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
