import { Component, signal, inject, DestroyRef } from '@angular/core';
import { Router } from '@angular/router'
import { RouterLink } from '@angular/router'
import { LoginData } from '../interface/LoginData';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/AuthService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-log-in',
  styleUrl: './log-in.css',
  templateUrl: './log-in.html',
})
export class LogIn {
  private readonly AuthService: AuthService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  registerModel = signal<LoginData>({
    username: '',
    password: ''
  });

  loginFormGroup = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  loginUser() {
    this.AuthService.login(
      this.loginFormGroup.value as LoginData
    )
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (response) => {
        console.log("Respuesta del login: ", response);
      localStorage.setItem(
        'token',
        response.access_token
      )
      this.loginFormGroup.reset();
      alert(`Ha iniciado sesión con éxito.`);
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Este es el error que está ocurriendo: ', err)
    }
    });
    
  }
}
