let express = require('express')
let bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./routes')(app)

app.get('/status', function (req, res ){
    res.send('Hello')
})

let port = 8081

app.listen(port, function () {
    console.log('server running on ' + port)
})