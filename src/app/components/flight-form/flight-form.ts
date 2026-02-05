import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FlightService } from '../../services/flight';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-form.html',
  styleUrl: './flight-form.css'
})
export class FlightFormComponent {
  private fb = inject(FormBuilder);
  private flightService = inject(FlightService);
  private authService = inject(AuthService);
  private router = inject(Router);

  private cdr = inject(ChangeDetectorRef);

  flightForm = this.fb.group({
    airline: ['', Validators.required],
    arrivalDate: ['', Validators.required],
    arrivalTime: ['', Validators.required],
    flightNumber: ['', Validators.required],
    numOfGuests: [1, [Validators.required, Validators.min(1)]],
    comments: ['']
  });

  submissionStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.flightForm.valid) {
      this.submissionStatus = 'submitting';
      const formValue = this.flightForm.value;

      const payload = {
        airline: formValue.airline!,
        arrivalDate: new Date(formValue.arrivalDate!).toISOString(),
        arrivalTime: formValue.arrivalTime!,
        flightNumber: formValue.flightNumber!,
        numOfGuests: formValue.numOfGuests!,
        comments: formValue.comments || undefined
      };

      this.flightService.submitFlightInfo(payload).subscribe({
        next: () => {
          this.submissionStatus = 'success';
          this.flightForm.reset();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Submission error', err);
          this.submissionStatus = 'error';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.flightForm.markAllAsTouched();
    }
  }
}
