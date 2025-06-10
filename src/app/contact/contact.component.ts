import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router'; // <-- Add this import

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
    private snackBar: MatSnackBar,
    private route: ActivatedRoute // <-- Inject ActivatedRoute
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
    // Pre-fill form if query params exist
    this.route.queryParams.subscribe(params => {
      const refTitle = params['title'];
      const refId = params['id'];
      const location = params['location'];

      if (refTitle || refId || location) {
        this.contactForm.patchValue({
          subject: `Inquiry about: ${refTitle || 'Property ID: ' + refId}`,
          message: `I'm interested in the property located at ${location}. Please provide more information.`
        });
      }
    });

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