import { Component } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mocks';
import { Course } from './courses-list/courses-list.component';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses: Course[] = [];

  constructor(private readonly coursesStateFacade: CoursesStateFacade) {
    this.coursesStateFacade.getAllCourses();
    this.coursesStateFacade.allCourses$.subscribe(courses => {
      this.courses = courses;
    })
  }

  onSearchCourses(query: string): void {
    console.log('User searched:', query);
    // Implement actual filtering logic or call a service
    this.coursesStateFacade.getFilteredCourses(query);
  }
}
