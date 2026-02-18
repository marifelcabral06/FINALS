import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-demo.html',
  styleUrl: './reactive-demo.css'
})
export class ReactiveDemoComponent {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]],
      department: ['', Validators.required],
      experience: ['', Validators.required],
      bio: [''],

      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{11}$/)
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

      confirmPassword: ['', Validators.required]

    }, {
      validators: this.passwordMatchValidator
    });
  }

  // ✅ Custom Password Match Validator
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      const errors = form.get('confirmPassword')?.errors;
      if (errors) {
        delete errors['mismatch'];
        if (!Object.keys(errors).length) {
          form.get('confirmPassword')?.setErrors(null);
        }
      }
    }
    return null;
  }

  // ✅ Submit Function
  onSubmit() {

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    console.log(this.registrationForm.value);
    alert("Reactive Form Submitted Successfully!");

    this.registrationForm.reset();
  }
}
