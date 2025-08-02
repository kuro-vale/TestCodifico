export type ClientOrder = {
    orderId: number;
    requiredDate: Date;
    shippedDate: Date;
    shipName: string;
    shipAddress: string;
    shipCity: string;
}