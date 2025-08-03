import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDetailsComponent } from './course-details/course-details.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CourseAddComponent,
    CourseEditComponent,
    CourseDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
  ]
})
export class CoursesModule { }
