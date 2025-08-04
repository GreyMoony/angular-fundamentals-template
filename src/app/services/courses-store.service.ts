import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { CoursesService } from '../services/courses.service';

export interface Course {
    id: string;
    title: string;
    description: string;
    duration: number;
    creationDate: string;
    authors: string[];
}

export interface Author {
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private readonly isLoading$$ = new BehaviorSubject<boolean>(false);
    public readonly isLoading$ = this.isLoading$$.asObservable();

    private readonly courses$$ = new BehaviorSubject<Course[]>([]);
    public readonly courses$ = this.courses$$.asObservable();
    constructor(private readonly coursesService: CoursesService) { }

    private setLoading(loading: boolean): void {
        this.isLoading$$.next(loading);
    }

    getAll() {
        this.setLoading(true);
        return this.coursesService.getAll().pipe(
            finalize(() => this.setLoading(false))
        ).subscribe({
            next: (courses) => this.courses$$.next(courses),
            error: () => this.courses$$.next([])
        });
    }

    createCourse(course: Course): Observable<Course> {
        this.setLoading(true);
        return this.coursesService.createCourse(course).pipe(
            finalize(() => this.setLoading(false))
        );
    }

    getCourse(id: string): Observable<Course> {
        this.setLoading(true);
        return this.coursesService.getCourse(id).pipe(
            finalize(() => this.setLoading(false))
        );
    }

    editCourse(id: string, course: Course): Observable<Course> {
        this.setLoading(true);
        return this.coursesService.editCourse(id, course).pipe(
            finalize(() => this.setLoading(false))
        );
    }

    deleteCourse(id: string): Observable<void> {
        this.setLoading(true);
        return this.coursesService.deleteCourse(id).pipe(
            finalize(() => this.setLoading(false))
        );
    }

    filterCourses(value: string) {
        this.setLoading(true);
        return this.coursesService.filterCourses(value).pipe(
            finalize(() => this.setLoading(false))
        ).subscribe({
            next: (courses) => this.courses$$.next(courses),
            error: () => this.courses$$.next([])  // optionally reset or keep old value
        });
    }

    getAllAuthors(): Observable<Author[]> {
        this.setLoading(true);
        return this.coursesService.getAllAuthors().pipe(
            finalize(() => this.setLoading(false))
        );
    }

    createAuthor(name: string): Observable<Author> {
        this.setLoading(true);
        return this.coursesService.createAuthor(name).pipe(
            finalize(() => this.setLoading(false))
        );
    }

    getAuthorById(id: string): Observable<Author> {
        this.setLoading(true);
        return this.coursesService.getAuthorById(id).pipe(
            finalize(() => this.setLoading(false))
        );
    }
}
