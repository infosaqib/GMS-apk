const { format } = require("morgan");
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
          
        },
        fatherName: {
            type: String,
        
        },
        contact: {
            type: String,
         unique: true
        },
        cnic: {
            type: String,
            unique: true
        },
        invoices:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'client-invoice'
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Client", clientSchema);
