import { TestBed } from '@angular/core/testing';

import { EmployeeActionService } from './employee-action.service';

describe('EmployeeActionService', () => {
  let service: EmployeeActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
