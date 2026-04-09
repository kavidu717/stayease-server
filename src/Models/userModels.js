import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    },

    stripeAccountId: {
        type: String,
        default: ""  
    },

    stripeSeller: {
        type: Object,
        default: {}   
    },

    stripeSessionId: {
        type: Object,
        default: {}  
    },

    isAdmin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });




export const User = mongoose.model('User', userSchema);