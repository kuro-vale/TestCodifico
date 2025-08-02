import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {OrderDetails} from "../../../models/order-details.model";
import {Order} from "../../../models/order.model";
import {EmployeeService} from "../../services/employee-service";
import {ShipperService} from "../../services/shipper-service";
import {ProductService} from "../../services/product-service";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-new-order-form-component',
    imports: [MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, ReactiveFormsModule, MatIconModule, RouterLink, AsyncPipe],
    template: `
        <form [formGroup]="orderForm" class="order-form" (ngSubmit)="submit()">
            <h2>Order</h2>
            <div class="row">
                <mat-form-field appearance="outline">
                    <mat-label>Employee</mat-label>
                    <mat-select formControlName="employee" required>
                        @for (employee of employees$ | async; track employee.empId) {
                            <mat-option [value]="employee.empId">{{ employee.fullName }}</mat-option>
                        }
                    </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-label>Shipper</mat-label>
                    <mat-select formControlName="shipper" required>
                        @for (shipper of shippers$ | async; track shipper.shipperId) {
                            <mat-option [value]="shipper.shipperId">{{ shipper.companyName }}</mat-option>
                        }
                    </mat-select>
                </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
                <mat-label>Ship Name</mat-label>
                <input matInput formControlName="shipName" required>
            </mat-form-field>

            <div class="row">
                <mat-form-field appearance="outline">
                    <mat-label>Ship Address</mat-label>
                    <input matInput formControlName="shipAddress" required>
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-label>Ship City</mat-label>
                    <input matInput formControlName="shipCity" required>
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-label>Ship Country</mat-label>
                    <input matInput formControlName="shipCountry" required>
                </mat-form-field>
            </div>

            <div class="row">
                <mat-form-field appearance="outline">
                    <mat-label>Order Date</mat-label>
                    <input matInput [matDatepicker]="orderDate" formControlName="orderDate" required>
                    <mat-datepicker-toggle matPrefix [for]="orderDate"></mat-datepicker-toggle>
                    <mat-datepicker #orderDate></mat-datepicker>
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-label>Required Date</mat-label>
                    <input matInput [matDatepicker]="requiredDate" formControlName="requiredDate" required>
                    <mat-datepicker-toggle matPrefix [for]="requiredDate"></mat-datepicker-toggle>
                    <mat-datepicker #requiredDate></mat-datepicker>
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-label>Shipped Date</mat-label>
                    <input matInput [matDatepicker]="shippedDate" formControlName="shippedDate" required>
                    <mat-datepicker-toggle matPrefix [for]="shippedDate"></mat-datepicker-toggle>
                    <mat-datepicker #shippedDate></mat-datepicker>
                </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
                <mat-label>Freight</mat-label>
                <input matInput type="number" formControlName="freight" required min="0">
                <button mat-icon-button matPrefix aria-label="Search">
                    <mat-icon>attach_money</mat-icon>
                </button>
            </mat-form-field>

            <h2>Order Details</h2>

            <mat-form-field appearance="outline" class="full-width">
                <mat-label>Product</mat-label>
                <mat-select formControlName="product" required>
                    @for (product of products$ | async; track product.productId) {
                        <mat-option [value]="product.productId">{{ product.productName }}</mat-option>
                    }
                </mat-select>
            </mat-form-field>

            <div class="row">
                <mat-form-field appearance="outline">
                    <mat-label>Unit Price</mat-label>
                    <input matInput type="number" formControlName="unitPrice" required min="1">
                    <button mat-icon-button matPrefix aria-label="Search">
                        <mat-icon>attach_money</mat-icon>
                    </button>
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-label>Quantity</mat-label>
                    <input matInput type="number" formControlName="quantity" required min="1">
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-label>Discount</mat-label>
                    <input matInput type="number" formControlName="discount" required min="0" max="1" step="0.1">
                </mat-form-field>
            </div>

            <div class="actions">
                <button mat-button type="button" routerLink="/">CLOSE</button>
                <button mat-button type="submit">SAVE</button>
            </div>
        </form>

    `,
    styles: `.order-form {
        max-width: 900px;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .row {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
    }

    .full-width {
        width: 100%;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
    }
    `
})
export class NewOrderFormComponent {
    private readonly employeeService = inject(EmployeeService);
    private readonly shipperService = inject(ShipperService);
    private readonly productService = inject(ProductService);

    employees$ = this.employeeService.getEmployees();
    shippers$ = this.shipperService.getShippers();
    products$ = this.productService.getProducts();

    orderForm = new FormGroup({
        employee: new FormControl<number | null>(null),
        shipper: new FormControl<number | null>(null),
        shipName: new FormControl(''),
        shipAddress: new FormControl(''),
        shipCity: new FormControl(''),
        shipCountry: new FormControl(''),
        orderDate: new FormControl(''),
        requiredDate: new FormControl(''),
        shippedDate: new FormControl(''),
        freight: new FormControl<number | null>(null),
        product: new FormControl<number | null>(null),
        unitPrice: new FormControl<number | null>(null),
        quantity: new FormControl<number | null>(null),
        discount: new FormControl<number | null>(null),
    });

    @Output() onSubmit = new EventEmitter<Order>()

    submit() {
        if (this.orderForm.invalid) return;
        const formValue = this.orderForm.value;
        const details: OrderDetails = {
            productId: formValue.product!,
            unitPrice: formValue.unitPrice!,
            qty: formValue.quantity!,
            discount: formValue.discount!,
        };
        const order: Order = {
            employeeId: formValue.employee!,
            shipperId: formValue.shipper!,
            shipName: formValue.shipName!,
            shipAddress: formValue.shipAddress!,
            shipCity: formValue.shipCity!,
            orderDate: new Date(formValue.orderDate!),
            requiredDate: new Date(formValue.requiredDate!),
            shippedDate: new Date(formValue.shippedDate!),
            freight: formValue.freight!,
            shipCountry: formValue.shipCountry!,
            details: details
        }
        this.onSubmit.emit(order);
    }
}
