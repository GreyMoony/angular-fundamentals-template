import 'jest-preset-angular/setup-jest';
import { TestBed } from '@angular/core/testing';
import { WINDOW } from '@app/auth/services/window.token';
import { provideMockStore } from '@ngrx/store/testing';

// Provide the WINDOW token globally for all tests
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      { provide: WINDOW, useValue: window },
      provideMockStore({
        initialState: {
          courses: {
            allCourses: [],
            isAllCoursesLoading: false,
            isSingleCourseLoading: false,
            isSearchState: false,
            errorMessage: null,
          },
        },
      }),
    ]
  });
});