import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var grecaptcha: any; // Declare grecaptcha for TypeScript

@Component({
  selector: 'app-contact',
  standalone: false,
  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;
  showCaptchaError = false;
  captchaResponse: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Initialize reCAPTCHA
    (window as any)['onCaptchaSuccess'] = (response: string) => this.onCaptchaSuccess(response);
    (window as any)['onCaptchaExpired'] = () => this.onCaptchaExpired();
  }
  
  onCaptchaSuccess(response: string): void {
    this.captchaResponse = response;
    this.showCaptchaError = false;
  }
  
  onCaptchaExpired(): void {
    this.captchaResponse = null;
    this.showCaptchaError = true;
  }


  onSubmit(): void {
    if (this.contactForm.invalid || !this.captchaResponse) {
      if (!this.captchaResponse) {
        this.showCaptchaError = true;
      }
      return;
    }

    this.loading = true;
    const formData = {
      ...this.contactForm.value,
      recaptchaToken: this.captchaResponse
    };

    this.contactService.submitContactForm(formData).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.snackBar.open('Message sent successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.contactForm.reset();
        this.loading = false;
        grecaptcha.reset(); // Reset reCAPTCHA
      },
      error: (error) => {
        console.error('Error:', error);
        const errorMessage = error.error.message || 'Failed to send message. Please try again.';
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.loading = false;
        grecaptcha.reset(); // Reset reCAPTCHA
      }
    });
  }
}
