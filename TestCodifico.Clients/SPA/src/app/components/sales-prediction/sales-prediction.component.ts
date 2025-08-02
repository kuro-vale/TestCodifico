import {Component, inject} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {CustomerService} from "../../services/customer-service";
import {SalesPredictionTable} from "./sales-prediction-table.component";
import {AsyncPipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-sales-prediction',
    imports: [
        NavbarComponent,
        SalesPredictionTable,
        AsyncPipe,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatIconButton,
        MatIconModule,
        ReactiveFormsModule
    ],
    template: `
        <app-navbar class="black">
            Sales Date Prediction App
        </app-navbar>
        <main class="content">
            <form class="search-bar" (ngSubmit)="submit()">
                <h2>Customers</h2>
                <mat-form-field appearance="outline">
                    <mat-label>Customer Name</mat-label>
                    <input matInput [formControl]="searchText">
                    <button mat-icon-button matSuffix aria-label="Search">
                        <mat-icon>search</mat-icon>
                    </button>
                </mat-form-field>
            </form>
            @if (customers$ | async; as customers) {
                <app-sales-prediction-table
                        [customers]="customers"
                ></app-sales-prediction-table>
            }
        </main>
    `,
    styles: `.search-bar {
        display: flex;
        justify-content: space-between;
    }`,
})
export class SalesPrediction {
    private readonly customerService = inject(CustomerService);
    customers$ = this.customerService.getPredictions();

    searchText = new FormControl('')

    submit() {
        this.customers$ = this.customerService.getPredictions(this.searchText.value)
    }
}
