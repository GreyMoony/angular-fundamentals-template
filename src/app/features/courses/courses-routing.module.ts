import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AdminGuard } from '@app/user/guards/admin.guard';

const routes: Routes = [
  { path: '', component: CoursesListComponent, },
  { path: 'add', component: CourseAddComponent, canActivate: [AdminGuard]},
  { path: 'edit/:id', component: CourseEditComponent, canActivate: [AdminGuard]},
  { path: ':id', component: CourseDetailsComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}