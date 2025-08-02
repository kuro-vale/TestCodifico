import {OrderDetails} from "./order-details.model";

export type Order = {
    employeeId: number;
    shipperId: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    orderDate: Date;
    requiredDate: Date;
    shippedDate: Date;
    freight: number;
    shipCountry: string;
    details: OrderDetails;
}
