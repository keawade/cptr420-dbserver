var express = require('express')

var app = express()

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cptr420')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('[mongoose] connected to mongodb://localhost/cptr420')
})

app.set('view engine', 'pug')
app.set('port', process.env.PORT || 3000)
app.set('ip', process.env.IP || 'localhost')

app.use(express.static('public'))
app.locals.sitename = 'CPTR420'
app.locals.source_url = 'https://github.com/UnionTTC/cptr420-dbserver'

app.get('/', function (req, res) {
  res.render('index')
})

var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app running at http://%s:%s', address.address, address.port)
})
