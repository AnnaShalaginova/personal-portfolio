import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  contactForm: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitted = true;
      console.log('Form Submitted!', this.contactForm.value);
      this.successMessage = 'Thank you for your message! I will get back to you soon.';
      this.contactForm.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        this.successMessage = '';
        this.submitted = false;
      }, 5000);
    }
  }
}
