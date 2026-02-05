import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  isLoginMode = true;
  errorMessage = '';
  successMessage = '';
  isEmailLoading = false;
  isGoogleLoading = false;

  showPassword = false;
  showConfirmPassword = false;

  authForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            // at least 1 lowercase, 1 uppercase, 1 digit, 1 special, 8+ chars
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
          ),
        ],
      ],
      confirmPassword: [''],
    },
    {
      validators: this.passwordsMatchValidator,
    }
  );

  // form-level validator: password & confirmPassword match
  private passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    // no error until user types in confirm
    if (!confirm) {
      return null;
    }

    return pass === confirm ? null : { passwordMismatch: true };
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
    this.authForm.reset();
    this.showPassword = false;
    this.showConfirmPassword = false;
  }

  async onEmailSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    // extra guard for signup: confirm password must be filled & match
    if (!this.isLoginMode) {
      const pass = this.authForm.get('password')?.value;
      const confirm = this.authForm.get('confirmPassword')?.value;

      if (!confirm || pass !== confirm) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }
    }

    this.isEmailLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const { email, password } = this.authForm.value;
    console.log('Attempting auth for:', email);

    try {
      if (this.isLoginMode) {
        await this.authService.loginWithEmail(email!, password!);
        this.successMessage = 'Login successful!';
      } else {
        await this.authService.signupWithEmail(email!, password!);
        this.successMessage = 'Account created successfully!';
      }

      this.cdr.detectChanges();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.router.navigate(['/flight-form']);
    } catch (error: any) {
      console.error('Full Auth Error:', error);

      const code = error.code || 'unknown';
      this.errorMessage = this.getFriendlyError(code);

      if (code === 'unknown') {
        this.errorMessage += ` (Details: ${error.message || JSON.stringify(error)})`;
      }
      this.cdr.detectChanges();
    } finally {
      this.isEmailLoading = false;
      this.cdr.detectChanges();
    }
  }

  async loginWithGoogle() {
    this.isGoogleLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      await this.authService.loginWithGoogle();
      this.successMessage = 'Google Sign-In successful!';
      this.cdr.detectChanges();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.router.navigate(['/flight-form']);
    } catch (error: any) {
      console.error('Google login failed', error);
      this.errorMessage = 'Google Sign-In failed. Please try again.';
    } finally {
      this.isGoogleLoading = false;
      this.cdr.detectChanges();
    }
  }

  private getFriendlyError(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/invalid-credential':
        return 'Authentication failed. Please try again.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'Email already in use. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password does not meet the strength requirements.';
      default:
        return 'Authentication failed. Please try again.';
    }
  }
}
