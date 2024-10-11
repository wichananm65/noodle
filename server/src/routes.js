
const NoodleController = require('./controllers/NoodleController');

let multer = require("multer")

// upload section
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        // callback(null, file.fieldname + '-' + Date.now());
        console.log(file);
        callback(null, file.originalname);
    }
})

module.exports = (app) => {
    app.post('/noodle', NoodleController.create);
    app.put('/noodle/:noodleId', NoodleController.put);
    app.delete('/noodle/:noodleId', NoodleController.remove);
    app.get('/noodle/:noodleId', NoodleController.show);
    app.get('/noodles', NoodleController.index);

    // upload
    app.post("/upload", function (req, res) {
        // isUserAuthenticated,
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        })
    }),

    //delete file uploaded function
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs'); 
            console.log(req.body.filename)

            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename, (err) => {
                if (err) throw err;
                res.send("Delete sucessful")
                // console.log('successfully deleted material file');
            });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete file the material'
            })
        }
    })
}