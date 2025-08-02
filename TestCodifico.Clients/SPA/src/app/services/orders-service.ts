import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ClientOrder} from "../../models/client-order.model";
import {Order} from "../../models/order.model";

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private readonly endpoint = `${environment.apiUrl}/orders`
    private readonly client = inject(HttpClient);

    getCustomerOrders(clientName: string) {
        return this.client.get<ClientOrder[]>(`${this.endpoint}/clients/${clientName}`);
    }

    addNewOrder(clientName: string, order: Order) {
        return this.client.post<void>(`${this.endpoint}/clients/${clientName}`, order);
    }
}
