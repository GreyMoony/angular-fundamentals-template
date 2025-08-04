import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

type FilterKey = 'title' | 'description' | 'duration' | 'creationDate';
@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private readonly baseUrl = 'http://localhost:4000/courses';
    private readonly authorsUrl = 'http://localhost:4000/authors';

    constructor(private readonly http: HttpClient) { }

    private parseFilters(queryString: string): Partial<Record<FilterKey, string[]>> {
        const filters: Partial<Record<FilterKey, string[]>> = {};
        const params = new URLSearchParams(queryString);

        for (const [key, value] of params.entries()) {
            if (['description', 'title', 'duration', 'creationDate'].includes(key)) {
                filters[key as FilterKey] = value.split(',').map(v => v.trim());
            }
        }

        return filters;
    }

    private buildHttpParams(filters: Partial<Record<FilterKey, string[]>>): HttpParams {
        let params = new HttpParams();

        for (const key in filters) {
            const values = filters[key as FilterKey];
            if (values) {
                params = params.set(key, values.join(','));
            }
        }

        return params;
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.baseUrl}/all`);
    }

    createCourse(course: {
        title: string;
        description: string;
        duration: number;
        authors: string[];
    }): Observable<any> {
        return this.http.post(`${this.baseUrl}/add`, course);
    }

    editCourse(id: string, course: {
        title: string;
        description: string;
        duration: number;
        authors: string[];
    }): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}`, course);
    }

    getCourse(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    deleteCourse(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }


    filterCourses(value: string): Observable<any> {
        const filters = this.parseFilters(value);
        const params = this.buildHttpParams(filters);

        return this.http.get(`${this.baseUrl}/filter`, { params });
    }

    getAllAuthors(): Observable<any> {
        return this.http.get(`${this.authorsUrl}/all`);
    }

    createAuthor(name: string): Observable<any> {
        return this.http.post(`${this.authorsUrl}/add`, { name });
    }

    getAuthorById(id: string): Observable<any> {
        return this.http.get(`${this.authorsUrl}/${id}`);
    }
}
