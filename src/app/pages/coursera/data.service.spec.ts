import { TestBed } from '@angular/core/testing';

import { Dataservice } from './data.service';

describe('Dataservice', () => {
  let service: Dataservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dataservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
