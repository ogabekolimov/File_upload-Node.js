const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{filesize: 10}
}).single('myImage');


const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + './public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg: err
            });
        } else {
            console.log(req.file);
            res.send('test');
        }
    })
});

const port = 5055;

app.listen(port, () => console.log(`Server started on port ${port}`));
