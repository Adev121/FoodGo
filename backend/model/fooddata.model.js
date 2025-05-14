import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    CategoryName:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Fooddata = mongoose.model('Fooddata', foodSchema);
export default Fooddata;