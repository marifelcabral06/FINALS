import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-demo.html',
  styleUrl: './template-demo.css'
})
export class TemplateDemoComponent {

  // ===== FIELDS =====
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  gender: string = '';
  status: string = '';
  phone: string = '';
  dob: string = '';
  address: string = '';
  comments: string = '';

  // ===== SUBMIT FUNCTION =====
  onSubmit(form: any) {
    console.log(form.value);
    alert('Form Submitted Successfully!');
  }

}
