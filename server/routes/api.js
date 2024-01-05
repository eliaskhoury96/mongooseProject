const express = require('express')
const router = express.Router()
const Expense = require('../model/Expense')
const moment = require ('moment')

router.get('/expenses', function (req, res) {
    let d1 = req.query.d1
    let d2 = req.query.d2
    if(d1!= undefined){
        if(d2 === undefined)
        {
            d2 = moment().format('LLLL')
        }
        Expense.find({$and:[{date:{$gt:d1}}, {date:{$lt:d2}}]}).sort({date : -1}).then(function(expenses){
            res.send(expenses)
        })
    }
    else{
    Expense.find({}).sort({date:-1})
    .then( function (expenses) {
        res.send(expenses)
    })
}
});



router.post('/expense', function (req, res) {
   const expense = req.body
    if(expense.date === undefined){
        expense.date = moment().format('LLLL')
    }
   else {expense.date = moment(expense.date).format('LLLL')} 
       const p1 = new Expense(expense)
       p1.save()  
       .then( function (result){
        res.send(result)
    }).catch (function(error){
        console.error(error);
        res.status(500)('Internal Server Error')
    });
});

router.put('/update', function (req, res) {
    const { group1, group2 } = req.body;
    Expense.findOneAndUpdate(
        { group: group1 },
         { group: group2}).then(()=>{
          Expense.findOne({group: group2}).then((expense)=>{
            res.send(expense)
          })  
         })
        })


        router.get('/expenses/:group/:total', function (req, res) {
           const group = req.params.group
           const total = req.query.total
           if(total){
           Expense.aggregate(
            [ { $match : { groupe: group } } ,{$group:{_id:null, count: {$sum: "$amount"}}}]
        ).then(function(result){
            console.log(result)
            res.send(`${result[0].count}`)
        })
    }
          else{

            Expense.find({group:group})
            .then( function (result) {
                res.send(result)
            })
        }
        })
        
module.exports = router