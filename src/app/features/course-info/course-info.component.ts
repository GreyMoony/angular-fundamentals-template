import { Component, Input } from '@angular/core';

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}
@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() course!: Course;
}
