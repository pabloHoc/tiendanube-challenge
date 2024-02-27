import express from 'express'
import axios from 'axios';
import bodyParser from 'body-parser'
import { CreditCard } from "./models/creditCard.js";
import { Transaction } from "./models/transaction.js";
import { Payable } from "./models/payable.js";
import { validate, ValidationError, Joi } from 'express-validation';

const app = express()
const port = 3000

app.use(bodyParser.json());

const transactionValidation = {
    body: Joi.object({
        value: Joi.number().positive().precision(2).required(),
        description: Joi.string().required(),
        method: Joi.string().valid('debit_card', 'credit_card').required(),
        cardNumber: Joi.string().length(16).regex(/^\d+$/).required(),
        cardHolderName: Joi.string().required(),
        cardExpirationDate: Joi.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/).required(),
        cardCvv: Joi.string().length(3).regex(/^\d+$/).required()
    })
}


app.post('/transactions', validate(transactionValidation, {}, {}), async (req, res) => {
    const { value, description, method, cardNumber, cardHolderName, cardExpirationDate, cardCvv } = req.body;
    
    const creditCard = new CreditCard(
        method,
        cardNumber,
        cardHolderName,
        cardExpirationDate,
        cardCvv
    )
    
    const transaction = new Transaction(value, description, creditCard);
    const payable = new Payable(method, value);
    
    try {
        await Promise.all([
            axios.post('http://0.0.0.0:8080/transactions', transaction.toDBRecord()),
            axios.post('http://0.0.0.0:8080/payables', payable.toDBRecord())
        ]);
    } catch (error) {
        return res.status(500).json(error)
    }
    
    return res.status(200).send();
})

app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})