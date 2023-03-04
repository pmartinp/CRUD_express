'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cochesSchema = new Schema({
    id: String,
    Marca: String,
    Modelo: String,
    Potencia: Number
})

const Coches = mongoose.model('Coches', cochesSchema, "coches");

module.exports = Coches;