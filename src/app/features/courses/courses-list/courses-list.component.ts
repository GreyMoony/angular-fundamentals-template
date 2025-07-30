import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShow(id: string): void {
    this.showCourse.emit(id);
  }

  onEdit(id: string): void {
    this.editCourse.emit(id);
  }

  onDelete(id: string): void {
    this.deleteCourse.emit(id);
  } 
}
