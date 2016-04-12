var express = require('express')
var bodyParser = require('body-parser')

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

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static('public'))
app.locals.sitename = 'CPTR420'
app.locals.source_url = 'https://github.com/UnionTTC/cptr420-dbserver'

var Data = require('./models/data.js')

app.get('/', function (req, res) {
  Data.find(function (err, info) {
    if (err) {
      console.log(err)
    }
    res.render('index', {
      title: 'index',
      records: info
    })
  })
})

app.post('/', function (req, res) {
  var temp = new Data()
  var tempData = {
    item: req.body.textinput
  }
  temp.set(tempData)
  temp.save(function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect('/')
  })
})

var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app running at http://%s:%s', address.address, address.port)
})
