import { TestBed } from '@angular/core/testing';

import { CatgeoryService } from './catgeory.service';

describe('CatgeoryService', () => {
  let service: CatgeoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatgeoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
