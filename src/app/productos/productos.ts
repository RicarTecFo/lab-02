import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ProductoService } from '../service/ProductoService';
import { ProductoData } from '../interface/ProductoData';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {

  productService: ProductoService = inject(ProductoService);
  productList: ProductoData[] = [];

  private readonly changeDetectorReference = inject(ChangeDetectorRef);
  isEditing = false;

  constructor() {
    this.productService.getAllProducts()
    .pipe(takeUntilDestroyed())
    .subscribe(products => {
      this.productList = products;
      console.log("Productos: ", products);
      this.changeDetectorReference.detectChanges();
    });
  }

  productForm = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl(0),
    cantidad: new FormControl(0),
    categoriaId: new FormControl(0),
  });
  
  createProduct() {
    this.productService.createProduct(
      this.productForm.value as ProductoData
    )
    .subscribe(() => {
      this.loadProducts();
      this.productForm.reset();
      alert('Producto creado con éxito.');
    });
  }

  updateProduct() {

    console.log(this.productForm.value); // postdata: esto también fue un dolor

    this.productService.updateProduct(  
      this.productForm.value.id as number,
      this.productForm.value as ProductoData
    )
    .subscribe(() => {
      this.loadProducts();
      this.productForm.reset();
      alert('Producto actualizado con éxito.');
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(
      this.productForm.value.id as number
    )
    .subscribe(() => {
      this.loadProducts();
      alert('Producto eliminado con éxito.');
    });
  }

  // Funciones auxiliares:

  loadProducts() {
    this.productService.getAllProducts()
    .subscribe(products => {
      this.productList = products;
      this.changeDetectorReference.markForCheck();
    });
  }

  selectProduct(product: ProductoData) {
    this.productForm.patchValue ({
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      cantidad: product.cantidad,
      categoriaId: product.categoriaId
    });

    this.isEditing = true;
      
    }
  }
