const express = require('express')
const cors  = require('cors')
require('dotenv').config()
const connectDB = require('./config/dbConection')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const fs =require('fs')
const cookieParser = require('cookie-parser')


const app = express()


app.use(cors())
app.use(express.static('uploads'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use('/user',userRouter)
app.use('/products',productRouter)

connectDB().then(()=>{

    app.listen(process.env.PORT,()=>{
        console.log("data base connected");
        console.log(`server runnning http://localhost:${process.env.PORT}`);
    })

})
