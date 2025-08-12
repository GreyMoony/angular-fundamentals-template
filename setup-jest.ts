import 'jest-preset-angular/setup-jest';
import { TestBed } from '@angular/core/testing';
import { WINDOW } from '@app/auth/services/window.token';

// Provide the WINDOW token globally for all tests
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      { provide: WINDOW, useValue: window }
    ]
  });
});