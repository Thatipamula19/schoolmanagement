import { TestBed } from '@angular/core/testing';

import { StudentadimisionService } from './studentadimision.service';

describe('StudentadimisionService', () => {
  let service: StudentadimisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentadimisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
