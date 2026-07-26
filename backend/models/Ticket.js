const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Open"
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
        default: "Low"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    comments: [

    {

        text: {
            type: String
        },

       commentedBy: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User"

},

        commentedAt: {

            type: Date,

            default: Date.now

        }

    }

],
history: [

    {

        action: {

            type: String

        },

        performedBy: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User"

        },

        performedAt: {

            type: Date,

            default: Date.now

        }

    }

],
    

},
{
    timestamps: true
});

module.exports = mongoose.model("Ticket", ticketSchema);