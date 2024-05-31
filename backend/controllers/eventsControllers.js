const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name'); // apuntes de populate

    res.json({
        ok: true,
        eventos
    })
}


    const crearEvento = async (req, res = response) => {

        const evento = new Evento(req.body)

        try {

            evento.user = req.uid;

            const eventoGuardado = await evento.save();

            res.json({
                ok: true,
                eventoGuardado,
                msg: 'crearEvento'
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                ok: false,
                msg: ' no se ha podido crear el evento'
            });
        }


    }

    const actualizarEvento = async (req, res = response) => {
        
        const eventoId = req.params.id;
        const uid = req.uid;

        try {
         
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } ); // apuntes del ultimo parametro

        res.json({
            ok: true,
            evento: eventoActualizado
        });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'no se ha podido actualizar el evento'
            });
        }
    }

    const eliminarEvento = async (req, res = response) => {

        const eventoId = req.params.id;
        const uid = req.uid;
    
        try {
    
            const evento = await Evento.findById( eventoId );
    
            if ( !evento ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe este evento'
                });
            }
    
            if ( evento.user.toString() !== uid ) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegios para eliminar este evento'
                });
            }
    
            await Evento.findByIdAndDelete( eventoId );
    
            res.json({ ok: true , msg: "evento eliminado"});
    
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'No se ha podido eliminar'
            });
        }    
    }

    module.exports = {
        getEventos,
        crearEvento,
        actualizarEvento,
        eliminarEvento
    }