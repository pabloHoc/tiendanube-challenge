export class Transaction {
    constructor(
        value,
        description,
        creditCard
    ) {
        this.value = value;
        this.description = description;
        this.creditCard = creditCard;
    }
    
    toDBRecord() {
        return {
            value: this.value,
            description: this.description,
            method: this.creditCard.method,
            cardNumber: this.creditCard.cardNumber.slice(-4),
            cardHolderName: this.creditCard.cardHolderName,
            cardExpirationDate: this.creditCard.cardExpirationDate,
            cardCvv: this.creditCard.cardCvv
        }
    }
}