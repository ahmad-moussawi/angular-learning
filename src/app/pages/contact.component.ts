import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface FormData {
  name: string;
  age: number;
  country: string;
}

@Component({
  template: `
    <pre>{{ formData | json }}</pre>

    <form #contactForm="ngForm">
      <div class="form-field">
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          [(ngModel)]="formData.name"
        />
      </div>

      <div class="form-field">
        <label for="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          [min]="10"
          [(ngModel)]="formData.age"
        />
      </div>

      <div class="form-field">
        <label for="country">Country</label>
        <select
          name="country"
          id="country"
          required
          [(ngModel)]="formData.country"
        >
          <option value="">-- Select Country --</option>
          <option value="LB">Lebanon</option>
          <option value="FR">France</option>
        </select>
      </div>

      <p>
        <button
          type="submit"
          [disabled]="contactForm.invalid"
          (click)="submit()"
        >
          Submit
        </button>
      </p>
    </form>
  `,

  styles: [
    `
      .form-field {
        display: grid;
        grid-template-columns: 100px 1fr;
        margin-bottom: 0.4rem;
      }

      .ng-touched.ng-invalid:not(form) {
        border-left: 4px solid red;
      }

      .ng-touched.ng-valid:not(form) {
        border-left: 4px solid green;
      }
    `,
  ],
})
export class ContactComponent {
  @ViewChild('contactForm') form!: NgForm;

  formData: FormData = {
    name: 'Ahmad',
    age: 0,
    country: '',
  };

  constructor() {
    console.log(this.form);
  }

  ngAfterViewInit() {
    this.form.valueChanges?.subscribe((values) => {
      console.log(values);
    });

    this.form.statusChanges?.subscribe((status) => {
      console.log(status);
    });
  }

  submit() {
    console.log(this.formData);

    // this.http.post('/api/contact', this.formData);

    // alert('Form submitted')
  }
}
