import { TestBed } from '@angular/core/testing';

import { AdiminInterceptor } from './adimin.interceptor';

describe('AdiminInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdiminInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AdiminInterceptor = TestBed.inject(AdiminInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
