import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { userFormGuard } from './user-form.guard';

describe('userFormGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userFormGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
