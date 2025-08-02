import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private readonly endpoint = `${environment.apiUrl}/products`
    private readonly client = inject(HttpClient);

    getProducts() {
        return this.client.get<Product[]>(`${this.endpoint}`);
    }
}
