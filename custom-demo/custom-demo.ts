import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custom-demo.html',
  styleUrl: './custom-demo.css'
})
export class CustomDemoComponent {

  customForm!: FormGroup;

  constructor(private fb: FormBuilder) {

    this.customForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      supplier: ['', [Validators.required, Validators.email]],
      warranty: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  onSubmit() {

    if (this.customForm.invalid) {
      this.customForm.markAllAsTouched();
      return;
    }

    console.log(this.customForm.value);
    alert("Product Registered Successfully!");
    this.customForm.reset();
  }

}
