import {CreditCardPaymentMethod, DebitCardPaymentMethod} from "./paymentMethod.js";

export class Payable {
    constructor(paymentMethod, subtotal) {
        this.paymentMethod = this.getPaymentMethod(paymentMethod);
        this.subtotal = subtotal;
    }

    getPaymentMethod(paymentMethod) {
        switch(paymentMethod) {
            case "debit_card":
                return new DebitCardPaymentMethod()
            case "credit_card":
                return new CreditCardPaymentMethod();
            default:
                throw Error("Invalid payment method");
        }
    }

    toDBRecord() {
        return {
            status: this.paymentMethod.initialStatus,
            create_date: this.paymentMethod.getCreationDate().toLocaleDateString('en-GB'),
            subtotal: this.subtotal,
            discount: this.paymentMethod.fee.toString(),
            total: this.paymentMethod.applyFee(this.subtotal).toFixed(2).toString()
        }
    }
}