import { Component } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mocks';
import { Course } from './courses-list/courses-list.component';
import { CoursesStoreService } from '@app/services/courses-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  constructor(private readonly coursesStroreService: CoursesStoreService){ }
  
  courses : Course[] = mockedCoursesList;
  onSearchCourses(query: string): void {
    console.log('User searched:', query);
    // Implement actual filtering logic or call a service
  }
}
