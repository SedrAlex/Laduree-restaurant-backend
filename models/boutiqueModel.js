const mongoose = require("mongoose");

const boutiqueSchema = new  mongoose.Schema({
    name:  
    {
        type: String, 
        required: true,
    },
    image: 
    {
        type: String,
        required: true,
    },
    price: 
    {
        type: Number,
        required: true,
    },
    category: 
    {
        type: String,
        required: true,
    },
    
    
})

const Boutique = mongoose.model("Boutique", boutiqueSchema);

module.exports.model = Boutique;
module.exports.schema = boutiqueSchema;
