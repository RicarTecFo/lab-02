import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoData } from '../interface/ProductoData';

@Service()
export class ProductoService {
    private http = inject(HttpClient);

    readonly url = "http://localhost:8080/api/v1/productos"
    protected productoList: ProductoData[] = [];

    createProduct(product: ProductoData): Observable<ProductoData> {
        const token = localStorage.getItem('token');
        console.log('Token: ', token)
        return this.http.post<ProductoData>(
            `${this.url}/`,
            product,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
    getAllProducts(): Observable<ProductoData[]> {
        const token = localStorage.getItem('token');
        console.log('Token: ', token)
        return this.http.get<ProductoData[]>(this.url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
    getProductById(id: number): Observable<ProductoData[]> {
        return this.http.get<ProductoData[]>(`${this.url}/${id}`);
    }
    updateProduct(id: number, product: ProductoData): Observable<ProductoData> {
        const token = localStorage.getItem('token');
        console.log('Token: ', token)
        return this.http.put<ProductoData>(
            `${this.url}/${id}`,
            product,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
    deleteProduct(id: number): Observable<void> {
        const token = localStorage.getItem('token');
        console.log('Token: ', token)
        return this.http.delete<void>(`${this.url}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
}