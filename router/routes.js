'use strict'

const express = require('express');
const router = express.Router();

//define the home page route
router.get('/', (req, res) =>{
    res.render("index", {titulo: "mi título dinámico", tituloWeb: "index"})
});

// define the about route
router.get('/contacto', (req, res) => {
    res.render("contacto", {tituloContacto: "Estamos en contacto de manera dinámica!", tituloWeb: "contacto"})
});

module.exports = router;