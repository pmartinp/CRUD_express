const express = require('express');
const router = express.Router();
const Coches = require('../models/Coches');

router.get('/', async (req, res) => {

    try {

        const arrayCochesDB = await Coches.find();
        console.log(arrayCochesDB);
        res.render("coches", {
            arrayCoches: arrayCochesDB
        })
    }catch (error) {
        console.error(error);
    }

});

router.post('/', async (req, res) => {

    const body = req.body
    console.log(body)
    try {

        const cochesDB = new Coches(body)
        await cochesDB.save()
        res.redirect('/coches')
    }catch (error) {
        console.error(error);
    }

});

router.get('/crear', (req, res)=>{
    res.render('crear')
})

router.get('/:id', async(req, res)=> {
    const id = req.params.id

    try {
        const cochesDB = await Coches.findOne({ _id: id})

        console.log(cochesDB)
        res.render('detalle', {
            coches: cochesDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalle', {
            error: true,
            mensaje: 'Coche no encontrado!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('_id desde backend', id)

    try{
        const cochesDB = await Coches.findByIdAndDelete({_id: id});
        console.log(cochesDB)

        if (!cochesDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el Coche.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Coche eliminado.'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const cochesDB = await Coches.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(cochesDB)
        res.json({
            estado: true,
            mensaje: 'Coche editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Coche'
        })
    }
})

module.exports = router;