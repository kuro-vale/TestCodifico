import {Component, inject} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {OrdersService} from "../../services/orders-service";
import {map} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {NewOrderFormComponent} from "./new-order-form-component";
import {Order} from "../../../models/order.model";

@Component({
    selector: 'app-new-order',
    imports: [
        NavbarComponent,
        AsyncPipe,
        NewOrderFormComponent
    ],
    template: `
        <app-navbar class="green">
            {{ customerName$ | async }} - New Order
        </app-navbar>
        <main class="content green">
            <app-new-order-form-component (onSubmit)="onSubmit($event)"></app-new-order-form-component>
        </main>
    `,
    styles: ``
})
export class NewOrderComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly orderService = inject(OrdersService);

    customerName$ = this.route.params.pipe(map(p => p['name'] as string));

    onSubmit(order: Order) {
        this.customerName$.subscribe(customerName => {
            this.orderService.addNewOrder(customerName, order).subscribe(async () => {
                await this.router.navigate(["/", customerName, "orders"])
            })
        });
    }
}
