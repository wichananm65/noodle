const NoodleController = require('./controllers/NoodleController')

module.exports = (app) => {
    app.post('/noodle',NoodleController.create)
    app.put('/noodle/:noodleId',NoodleController.put)
    app.delete('/noodle/:noodleId',NoodleController.remove)
    app.get('/noodle/:noodleId',NoodleController.show)
    app.get('/noodles', NoodleController.index)
}