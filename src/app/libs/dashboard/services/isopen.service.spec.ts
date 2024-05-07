import { TestBed } from '@angular/core/testing';

import { IsopenService } from './isopen.service';

describe('IsopenService', () => {
  let service: IsopenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsopenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
