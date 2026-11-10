import { Component, signal, inject, DestroyRef } from '@angular/core';
import { Router } from '@angular/router'
import { RouterLink } from '@angular/router'
import { RegisterData } from '../interface/RegisterData';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/AuthService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {

  private readonly AuthService: AuthService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  registerModel = signal<RegisterData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  registerFormGroup = new FormGroup({
    email: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.email] 
    }),
    username: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: Validators.required })
  });

  registerUser() {
    this.AuthService.register(
      this.registerFormGroup.value as RegisterData
    )
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
      this.registerFormGroup.reset();
      alert(`Se ha registrado con éxito.`);
      this.router.navigate(['/log-in']);
    },
    error: (err) => {
      console.error('Este es el error que está ocurriendo: ', err) // postdata: resolver este error fue un dolor
    }
    });
  }
}
