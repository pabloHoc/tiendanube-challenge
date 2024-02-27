export class CreditCard {
    constructor(
        type,
        cardNumber,
        cardHolderName,
        cardExpirationDate,
        cardCvv
    ) {
        this.type = type;
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.cardExpirationDate = cardExpirationDate;
        this.cardCvv = cardCvv;
    }
}