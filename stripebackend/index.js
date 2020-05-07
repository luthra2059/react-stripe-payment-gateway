const cors = require("cors")
const express = require("express")
const app = express()
const stripe = require("stripe")("Your_secret_key")
const uuid = require("uuid")
app.use(express.json())
app.use(cors())

app.get("/",(req, res)=>{
    res.send("It works!!")
})
app.post("/payment",(req,res)=>{
    const {product, token} = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", price);
    const idempontencyKey = uuid();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        },{idempontencyKey})
    }).then(result=>res.status(200).json(result)).catch(err=>console.log(err))

})
app.listen(8282,()=> console.log("Listening at port : 8282"))