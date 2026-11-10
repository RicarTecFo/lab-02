import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaData } from '../interface/CategoriaData';

@Service()
export class CategoriaService {
    private http = inject(HttpClient);

    readonly url = "http://localhost:8080/api/v1/categoria"
    protected categoriaList: CategoriaData[] = [];

    createCategory(category: CategoriaData): Observable<CategoriaData> {
        const token = localStorage.getItem('token');
        return this.http.post<CategoriaData>(
            `${this.url}/`,
            category,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
    getAllCategories(): Observable<CategoriaData[]> {
        const token = localStorage.getItem('token');
        console.log('Token: ' , token)
        return this.http.get<CategoriaData[]>(this.url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
    getCategoryById(id: number): Observable<CategoriaData[]> {
        return this.http.get<CategoriaData[]>(`${this.url}/${id}`);
    }
    updateCategory(id: number, category: CategoriaData): Observable<CategoriaData> {
        const token = localStorage.getItem('token');
        return this.http.put<CategoriaData>(
            `${this.url}/${id}`,
            category,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
    deleteCategory(id: number): Observable<void> {
        const token = localStorage.getItem('token');
        return this.http.delete<void>(`${this.url}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
}