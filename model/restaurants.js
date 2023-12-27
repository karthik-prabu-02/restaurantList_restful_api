import mongoose from "mongoose";

//need to build the schema
const Schema = mongoose.Schema;
const restaurantSchema = new Schema ({
    id : {
        type : String,
        require : true,
        unique : true
    },
    name:{
        type : String,
        required : true // if someone not enterd name application will break id required is true
        // if something like unique then use => unique:true 
    },
    cuisine:{
        type : String,
        required : true 
    },
    address:{
        type : String,
        required : true 
    },
    city : {
        type : String,
        required : true 
    },
    rating : {
        type : Number,
        required : true,
        min: 1, // Minimum value allowed
        max: 5  // Maximum value allowed 
        // minlength:5 -> it allows only 5 characters
    },
    averageRating : {
        type : Number,
        default : 0
    },
    menu : {
        type: [Schema.Types.mixed], // Array that can contain various types
        default: [] // -> Default values with mixed types 
        // we can also enter values in default. eg., default : ["itly" , "dosa"]
    },
    reviews : {
        type: [Schema.Types.mixed],
        default : []
    }

});// in mongodb collections stored as restaurants


export default mongoose.model("restaurant" , restaurantSchema);
// in mongodb collections stored as restaurants
