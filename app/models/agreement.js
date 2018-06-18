
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let agreementSchema = mongoose.Schema({
    name: {     // Name of the division
        type: String,
        required: true
    },
    start_date:{
        type:String
    },
    end_date:{
        type:String
    },
    value:{
        type:Number
    },
    status:{
        type:String,
        enum:['Active', 'Renewed', 'Amended'],
        default: 'Active'
    },
    date_Created: {
        type: Date
    },
    date_Modified: {
        type: Date,
        default: Date.now
    }
});

module.exports = Agreement = mongoose.model('agreements', agreementSchema);