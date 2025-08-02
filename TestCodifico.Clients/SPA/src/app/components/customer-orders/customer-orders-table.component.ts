import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {
    MatTableDataSource,
    MatTableModule
} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {ClientOrder} from "../../../models/client-order.model";

@Component({
    selector: 'app-customer-orders-table',
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        DatePipe
    ],
    template: `
        <table mat-table [dataSource]="tableDataSource" matSort>
            <!-- Order ID -->
            <ng-container matColumnDef="orderId">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Order ID</th>
                <td mat-cell *matCellDef="let order">{{ order.orderId }}</td>
            </ng-container>

            <!-- Required Date -->
            <ng-container matColumnDef="requiredDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Required Date</th>
                <td mat-cell *matCellDef="let order">{{ order.requiredDate | date }}</td>
            </ng-container>

            <!-- Shipped Date-->
            <ng-container matColumnDef="shippedDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Shipped Date</th>
                <td mat-cell *matCellDef="let order">{{ order.shippedDate | date }}</td>
            </ng-container>

            <!-- Ship Name -->
            <ng-container matColumnDef="shipName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Ship Name</th>
                <td mat-cell *matCellDef="let order">{{ order.shipName }}</td>
            </ng-container>

            <!-- Ship Address -->
            <ng-container matColumnDef="shipAddress">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Ship Address</th>
                <td mat-cell *matCellDef="let order">{{ order.shipAddress }}</td>
            </ng-container>

            <!-- Ship City -->
            <ng-container matColumnDef="shipCity">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Ship City</th>
                <td mat-cell *matCellDef="let order">{{ order.shipCity }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
        <mat-paginator [pageSizeOptions]="[10, 20]">
        </mat-paginator>
    `,
    styles: ``
})
export class CustomerOrdersTable implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    @Input({required: true}) orders!: ClientOrder[];
    tableDataSource = new MatTableDataSource<ClientOrder>();

    ngAfterViewInit() {
        this.tableDataSource.data = this.orders;
        this.tableDataSource.sort = this.sort;
        this.tableDataSource.paginator = this.paginator;
    }

    displayedColumns = ['orderId', 'requiredDate', 'shippedDate', 'shipName', 'shipAddress', 'shipCity'];
}
