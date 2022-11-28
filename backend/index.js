const express = require ("express")

const cors = require("cors")

const mongoose = require("mongoose")

const register= require('./routes/register')
const login= require('./routes/login')
const products= require('./routes/products')


const app = express()
require("dotenv").config()
app.use(express.json({limit: '50mb'}))
app.use(cors());

app.use("/api/register",register);
app.use("/api/login",login);
app.use("/api/products",products);


app.get("/",(req,res)=>{
    res.send("Welcome to our shop ") ;
})


app.get("/products",(req,res)=>{
    res.send("Welcome to our shop ") ;
})

const port = process.env.PORT || 5000
const uri=process.env.DB_URI

app.listen(port,console.log(`Server is running on port ${port}`))



//configure mongoose
mongoose.connect(
  `${process.env.DB_URI}online-shop`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log('not connected',err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);