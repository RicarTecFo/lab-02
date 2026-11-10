import { Component, inject } from '@angular/core';
import { UserService } from '../service/UserService';
import { DestroyRef } from '@angular/core';
import { UserData } from '../interface/UserData';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-usuarios',
  styleUrl: './usuarios.css',
  templateUrl: './usuarios.html',
})
export class Usuarios {
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  users: UserData[] = [];

  ngOnInit(): void {

    this.userService.getAllUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(users => {
        this.users = users;
      });

  }
}
