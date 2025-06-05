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
  if (this.contactForm.invalid) return;

  this.loading = true;

  this.contactService.sendMessage(this.contactForm.value).subscribe({
    next: (res) => {
      this.snackBar.open('Message sent successfully!', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.contactForm.reset();
      this.loading = false;
    },
    error: (err) => {
      this.snackBar.open('Failed to send message. Please try again.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      this.loading = false;
    }
  });
}

}
