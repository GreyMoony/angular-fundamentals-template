import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';
import { CoursesStateFacade } from './courses.facade';
import { CoursesService } from '@app/services/courses.service';

@Injectable()
export class CoursesEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly coursesService: CoursesService,
        private coursesStateFacade: CoursesStateFacade,
        private router: Router
    ) { }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            switchMap(() =>
                this.coursesService.getAll().pipe(
                    map((courses) => (CoursesActions.requestAllCoursesSuccess({ courses }))),
                    catchError((error) => of(CoursesActions.requestAllCoursesFail({ error })))
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            withLatestFrom(this.coursesStateFacade.allCourses$),
            map(([action, allCourses]) => {
                const filteredCourses = allCourses.filter(course =>
                    course.title.toLowerCase().includes(action.title.toLowerCase())
                );
                return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
            })
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            mergeMap((action) =>
                this.coursesService.getCourse(action.id).pipe(
                    map((course) => CoursesActions.requestSingleCourseSuccess({ course })),
                    catchError((error) => of(CoursesActions.requestSingleCourseFail({ error })))
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap((action) =>
                this.coursesService.deleteCourse(action.id).pipe(
                    map(() => CoursesActions.requestAllCourses()),
                    catchError((error) => of(CoursesActions.requestDeleteCourseFail({ error })))
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            mergeMap((action) =>
                this.coursesService.editCourse(action.id, action.course).pipe(
                    map((course) => CoursesActions.requestEditCourseSuccess({ course })),
                    catchError((error) => of(CoursesActions.requestEditCourseFail({ error })))
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            mergeMap((action) =>
                this.coursesService.createCourse(action.course).pipe(
                    map((course) => CoursesActions.requestCreateCourseSuccess({ course })),
                    catchError((error) => of(CoursesActions.requestCreateCourseFail({ error })))
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    CoursesActions.requestCreateCourseSuccess,
                    CoursesActions.requestEditCourseSuccess,
                    CoursesActions.requestSingleCourseFail
                ),
                map(() => this.router.navigate(['/courses']))
            ),
        { dispatch: false }
    );
}
