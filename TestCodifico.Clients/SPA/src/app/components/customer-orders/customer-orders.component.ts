import {Component, inject} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {map, switchMap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {OrdersService} from "../../services/orders-service";
import {CustomerOrdersTable} from "./customer-orders-table.component";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-customer-orders',
    imports: [
        NavbarComponent,
        AsyncPipe,
        CustomerOrdersTable,
        MatButtonModule,
        RouterLink
    ],
    template: `
        <app-navbar class="red">
            {{ customerName$ | async }} - Orders
        </app-navbar>
        <main class="content">
            @if (orders$ | async; as orders) {
                <app-customer-orders-table [orders]="orders"></app-customer-orders-table>
            }
            <div class="close">
                <button matButton class="red" routerLink="/">CLOSE</button>
            </div>
        </main>
    `,
    styles: `.close {
        display: flex;
        justify-content: flex-end;
    }`
})
export class CustomerOrders {
    private readonly route = inject(ActivatedRoute);
    private readonly orderService = inject(OrdersService);

    customerName$ = this.route.params.pipe(map(p => p['name'] as string));

    orders$ = this.customerName$
        .pipe(switchMap(customerName => this.orderService.getCustomerOrders(customerName)))
}
