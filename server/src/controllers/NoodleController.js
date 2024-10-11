const { Noodle } = require('../models');

module.exports = {
    async index(req, res) {
        try {
            let noodles = null
            const search = req.query.search
            // console.log('search key: ' + search)
            if (search) {
                noodles = await Noodle.findAll({
                    where: {
                        $or: [
                            'title', 'content', 'category'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                    },
                    order: [['updatedAt', 'DESC']]
                })
            } else {
                noodles = await Noodle.findAll({
                    order: [['updatedAt', 'DESC']]
                })
            }
            res.send(noodles)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the noodles'
            })
        }
    },

    async create(req, res) {
        try {
            console.log('Noodle create req.body:', req.body)
            const noodle = await Noodle.create(req.body)
            console.log('Noodle create Noodle:', noodle)
            res.send(noodle.toJSON())
        } catch (err) {
            console.log('Noodle create err:', err)
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

    async remove(req, res) {
        try {
            const noodle = await Noodle.findOne({
                where: {
                    id: req.params.noodleId
                }
            })
            if (!noodle) {
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
    },

    async show(req, res) {
        try {
            const noodle = await Noodle.findByPk(req.params.noodleId)
            res.send(noodle)
        } catch (err) {
            req.status(500).send({
                error: 'The noodle information was incorrect'
            })
        }
    }
}