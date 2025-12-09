const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    fullname: {
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
        // required: true
    },
    company: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
            type: String,
            default: ""
    },
    number: {
        type: String,
        default: ""
    },
    postalcode: {
        type: String,
        default: ""
    },
    order: {
        type: Array,
        default: []
    },
    address: {

    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "user"
    }
});

const contactSchema = new Schema({
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    phoneno: {
        type: String,
        default: ""
    },
    altphoneno: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    }

})

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Array,
        default: []
    },
    image: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Contact = model("contact", contactSchema);
const User = model("user", userSchema);
const Product = model("product", productSchema);

module.exports = {User, Product, Contact};