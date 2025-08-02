import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Shipper} from "../../models/shipper.model";

@Injectable({
    providedIn: 'root'
})
export class ShipperService {
    private readonly endpoint = `${environment.apiUrl}/shippers`
    private readonly client = inject(HttpClient);

    getShippers() {
        return this.client.get<Shipper[]>(`${this.endpoint}`);
    }
}
