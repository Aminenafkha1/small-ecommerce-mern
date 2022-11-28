const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title:{type: String,required:true,minlength: 3 , maxlength:30},
    price: {
        type:Number,required:true
    },
    img : {
        type: Object,
        required:true,
    },
    desc : {
        type: String,
        required:true,
        minlength: 3 , maxlength:1024,
    },

},  { timestamps: true }
)

const Product =mongoose.model("Product" ,productSchema);

exports.Product = Product;
