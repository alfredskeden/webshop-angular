import { Checkoutorderproduct } from './checkoutorderproduct';

export class Checkoutorder {
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: Array<Checkoutorderproduct>;
}
