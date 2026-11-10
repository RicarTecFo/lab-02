import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from '../service/CategoriaService';
import { CategoriaData } from '../interface/CategoriaData';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-categorias',
  styleUrl: './categorias.css',
  templateUrl: './categorias.html',
})
export class Categorias {

  categoriaService: CategoriaService = inject(CategoriaService);
  categoryList: CategoriaData[] = [];

  private readonly changeDetectorReference = inject(ChangeDetectorRef);
  isEditing = false;

  constructor() {
    this.categoriaService.getAllCategories()
    .pipe(takeUntilDestroyed())
    .subscribe(categories => {
      this.categoryList = categories;
      this.changeDetectorReference.detectChanges();
    });
  }

  categoryForm = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
  });
  
  createCategory() {
    this.categoriaService.createCategory(
      this.categoryForm.value as CategoriaData
    )
    .subscribe(() => {
      this.loadCategories();
      this.categoryForm.reset();
      alert('Categoría creada con éxito.');
    });
  }

  updateCategory() {
    this.categoriaService.updateCategory(
      this.categoryForm.value.id as number,
      this.categoryForm.value as CategoriaData
    )
    .subscribe(() => {
      this.loadCategories();
      this.categoryForm.reset();
      alert('Categoría actualizada con éxito.');
    });
  }

  deleteCategory() {
    this.categoriaService.deleteCategory(
      this.categoryForm.value.id as number
    )
    .subscribe(() => {
      this.loadCategories();
      alert('Categoría eliminada con éxito.');
    });
  }

  // Funciones auxiliares:
  
    loadCategories() {
      this.categoriaService.getAllCategories()
      .subscribe(categories => {
        this.categoryList = categories;
        this.changeDetectorReference.markForCheck();
      });
    }
  
    selectCategories(categories: CategoriaData) {
      this.categoryForm.patchValue ({
        id: categories.id,
        nombre: categories.nombre,
        descripcion: categories.descripcion
      });

      this.isEditing = true;
        
      }
}
