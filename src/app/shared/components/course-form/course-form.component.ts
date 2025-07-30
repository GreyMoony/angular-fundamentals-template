import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormArray, AbstractControl
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  formSubmitted = false;
  allAuthors: { id: string; name: string }[] = [
    { id: '1', name: 'Author One' },
    { id: '2', name: 'Author Two' },
  ];

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(1)]],
      authors: this.fb.array([]), // selected course authors
      newAuthor: this.fb.group({
        name: [
          '',
          [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9 ]+$/)],
        ],
      }),
    });
  }

  get authorsArray(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get newAuthorGroup(): FormGroup {
  return this.courseForm.get('newAuthor') as FormGroup;
  }
  
  get newAuthorControl(): AbstractControl | null {
    return this.courseForm.get('newAuthor.name');
  }

  get duration(): number {
    return this.courseForm.get('duration')?.value || 0;
  }
  
  createCourse(): void {
    this.formSubmitted = true;
    if (this.courseForm.valid) {
      console.log('Course created:', this.courseForm.value);
    }
  }

  createAuthor(): void {
    const name = this.newAuthorControl?.value?.trim();
    if (name && this.newAuthorControl?.valid) {
      const newAuthor = { id: uuidv4(), name };
      this.allAuthors.push(newAuthor);
      this.courseForm.get('newAuthor')?.reset();
    }
  }

  addAuthorToCourse(author: { id: string; name: string }): void {
    const exists = this.authorsArray.value.some((a: any) => a.id === author.id);
    if (!exists) {
      this.authorsArray.push(this.fb.control(author));
      this.allAuthors = this.allAuthors.filter((a) => a.id !== author.id);
    }
  }

  removeAuthorFromCourse(author: { id: string; name: string }, index: number): void {
    this.allAuthors.push(author);
    this.authorsArray.removeAt(index);
  }

  showError(controlName: string): boolean | null {
    const control = this.courseForm.get(controlName);
    return control && (control.touched || this.formSubmitted) && control.invalid;
  }
  
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
