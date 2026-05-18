import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { supabase } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      this.errorMessage.set('');
      
      try {
        // 1. Save to Supabase (Database Log)
        const { error: dbError } = await supabase
          .from('contact_messages')
          .insert([this.contactForm.value]);

        if (dbError) throw dbError;

        // 2. Send Email via Vercel Function
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.contactForm.value),
        });

        if (!emailResponse.ok) throw new Error('Failed to send email');

        this.successMessage.set('Thank you! Your message has been sent and saved.');
        this.contactForm.reset();
        
        setTimeout(() => {
          this.successMessage.set('');
        }, 5000);
      } catch (err: any) {
        console.error('Error saving message:', err);
        this.errorMessage.set('Oops! Something went wrong. Please try again.');
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }
}
