import mongoose from "mongoose";
const OrderSchema =  mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    userName:{
        type : String,
        required : true
    },
    Orders : {
        type : Array,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    address : {
        type : Object,
        required : true
    },
    paymentId : {
        type : String,
        required : true
    }
},{
    timestamps:true
})

const Orderdata = mongoose.model('Orderdata', OrderSchema);
export default Orderdata;