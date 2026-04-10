import type { CourseChallenge } from '../../types';

export const WEEK3_DAY5_CHALLENGE: CourseChallenge = {
  description:
    'Build a reactive login form with email and password validation. Email must be a valid address; password must be at least 6 characters. Show field errors on blur and disable the submit button while the form is invalid.',
  starterCode: `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// 🎯 Timed Challenge — Reactive Forms & Validators
// Build a login form:
//   • FormGroup with 'email' (required, valid email) and
//     'password' (required, minLength 6) controls
//   • Submit button disabled while form.invalid
//   • Error messages shown when a control is touched and invalid
//   • On submit, console.log(form.getRawValue())

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<!-- TODO -->',
})
export class LoginForm {
  // TODO: define FormGroup with typed controls and validators
}`,
  solutionCode: `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()"
          style="display:flex;flex-direction:column;gap:1rem;max-width:20rem">
      <div>
        <input formControlName="email" type="email" placeholder="Email"
               style="width:100%;padding:.5rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:.5rem;color:white" />
        @if (form.controls.email.touched && form.controls.email.invalid) {
          <p style="color:#f87171;font-size:.75rem;margin-top:.25rem">Valid email is required.</p>
        }
      </div>
      <div>
        <input formControlName="password" type="password" placeholder="Password"
               style="width:100%;padding:.5rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:.5rem;color:white" />
        @if (form.controls.password.touched && form.controls.password.invalid) {
          <p style="color:#f87171;font-size:.75rem;margin-top:.25rem">Min 6 characters required.</p>
        }
      </div>
      <button type="submit" [disabled]="form.invalid"
              style="padding:.5rem 1rem;border-radius:.5rem;background:#6366f1;color:white;cursor:pointer">
        Sign In
      </button>
    </form>
  \`,
})
export class LoginForm {
  form = new FormGroup({
    email:    new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  onSubmit() {
    if (this.form.valid) console.log(this.form.getRawValue());
  }
}`,
};
