import {Routes} from '@angular/router';
import {SalesPrediction} from "./components/sales-prediction/sales-prediction.component";
import {CustomerOrders} from "./components/customer-orders/customer-orders.component";
import {NewOrderComponent} from "./components/new-order/new-order-component";

export const routes: Routes = [
    {
        path: '',
        component: SalesPrediction
    },
    {
        path: ':name/orders',
        component: CustomerOrders
    },
    {
        path: ':name/orders/add',
        component: NewOrderComponent
    }
];
