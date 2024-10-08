const {Noodle} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            const noodles = await Noodle.findAll()
            res.send(noodles)
        } catch (err){
            res.status(500).send({
                error: 'The noodles information was incorrect'
            })
        }
    },
    
    async show(req, res) {
        try {
            const noodle = await Noodle.findByPk(req.params.noodleId)
            res.send(noodle)
        } catch (err) {
            res.status(500).send({
                error: 'The noodle information was incorrect'
            })
        }
    },
    
    async create(req, res) {
        try {
            const noodle = await Noodle.create(req.body)
            res.send(noodle.toJSON())
        } catch (err){
            res.status(500).send({
                error: 'Create noodle incorrect'
            })
        }
    },
    
    async put(req, res) {
        try {
            await Noodle.update(req.body, {
                where: {
                    id: req.params.noodleId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update noodle incorrect'
            })
        }
    },
    
    async remove (req, res) {
        try {
            const noodle = await Noodle.findOne({
                where: {
                    id: req.params.noodleId
                }
            })

            if(!noodle){
                return res.status(403).send({
                    error: 'The noodle information was incorrect'
                })
            }

            await noodle.destroy()
            res.send(noodle)
        } catch (err) {
            res.status(500).send({
                error: 'The noodle information was incorrect'
            })
        }
    }
}