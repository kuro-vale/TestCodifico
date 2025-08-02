import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {CustomerPrediction} from "../../models/cutomer-prediction.model";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private readonly endpoint = `${environment.apiUrl}/customers`
    private readonly client = inject(HttpClient);

    getPredictions(searchText: string | null = '') {
        let params = new HttpParams();
        if (searchText) {
            params = params.append("customerName", searchText)
        }
        return this.client.get<CustomerPrediction[]>(`${this.endpoint}/prediction`, {params});
    }
}
