const express = require('express')
const app = express();
const port = 7000;
const path = require('path')
const hbs = require('express-handlebars')
const multer = require('multer')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public2')))

require('./server/database/database')();

app.set('view engine', 'hbs')
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials')
}))

app.use("/", require('./server/router/router.js'))

app.listen(port, () => console.log(`Server started on port ${port}`)) 