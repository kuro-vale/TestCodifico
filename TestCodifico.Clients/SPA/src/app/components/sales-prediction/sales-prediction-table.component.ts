import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {
    MatTableDataSource,
    MatTableModule
} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {CustomerPrediction} from "../../../models/cutomer-prediction.model";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-sales-prediction-table',
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        RouterLink,
        DatePipe
    ],
    template: `
        <table mat-table [dataSource]="tableDataSource" matSort>
            <!-- Customer Name -->
            <ng-container matColumnDef="customerName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Customer Name</th>
                <td mat-cell *matCellDef="let customer">{{ customer.customerName }}</td>
            </ng-container>

            <!-- Last Order Date -->
            <ng-container matColumnDef="lastOrderDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Last Order Date</th>
                <td mat-cell *matCellDef="let customer">{{ customer.lastOrderDate | date }}</td>
            </ng-container>

            <!-- Next Predicted Order-->
            <ng-container matColumnDef="nextPredictedOrder">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Next Predicted Order</th>
                <td mat-cell *matCellDef="let customer">{{ customer.nextPredictedOrder | date }}</td>
            </ng-container>

            <!-- Actions -->
            <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let customer">
                    <button matButton class="red" [routerLink]="[customer.customerName, 'orders']">
                        VIEW ORDERS
                    </button>
                    <button matButton class="green" [routerLink]="[customer.customerName, 'orders', 'add']">
                        NEW ORDER
                    </button>
                </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
        <mat-paginator [pageSizeOptions]="[10, 20]">
        </mat-paginator>
    `,
    styles: ``
})
export class SalesPredictionTable implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    @Input({required: true}) customers!: CustomerPrediction[];
    tableDataSource = new MatTableDataSource<CustomerPrediction>();

    ngAfterViewInit() {
        this.tableDataSource.data = this.customers;
        this.tableDataSource.sort = this.sort;
        this.tableDataSource.paginator = this.paginator;
    }

    displayedColumns = ['customerName', 'lastOrderDate', 'nextPredictedOrder', 'actions'];
}
