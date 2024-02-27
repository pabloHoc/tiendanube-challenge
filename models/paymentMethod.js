class PaymentMethod {
    constructor(fee, initialStatus) {
        this.fee = fee;
        this.initialStatus = initialStatus;
    }

    getCreationDate() {
        throw new Error("getCreationDate must be implemented")
    }

    applyFee(value) {
        return value - (this.fee * 100 / value)
    }
}

export class DebitCardPaymentMethod extends PaymentMethod {
    constructor() {
        super(2, "paid");
    }

    getCreationDate() {
        return new Date();
    }
}

export class CreditCardPaymentMethod extends PaymentMethod {
    constructor() {
        super(4, "waiting_funds");
    }

    getCreationDate() {
        const date = new Date();
        date.setDate(date.getDate() + 30)
        return date;
    }
}