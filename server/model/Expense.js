const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    item : String,
    amount : Number,
    date : Date,
    group:String,
})

const Expense = mongoose.model("expense",expenseSchema )
// expenses.forEach(element => {
//     const expense = new Expense(element)
//     expense.save()  
// });
module.exports = Expense

