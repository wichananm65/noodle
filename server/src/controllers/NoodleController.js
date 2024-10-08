module.exports = {
    index (req, res) {
        res.send('show all noodles')
    },
    
    show(req, res) {
        res.send('show noodle ' + req.params.noodleId)
    },
    
    create(req, res) {
        res.send('create noodle: ' + JSON.stringify(req.body))
    },
    
    put(req, res) {
        res.send('edit noodle: ' + req.params.noodleId + ' : ' + JSON.stringify(req.body))
    },
    
    remove(req, res) {
        res.send('delete noodle: ' + req.params.noodleId + ' : ' + JSON.stringify(req.body))
    }
}