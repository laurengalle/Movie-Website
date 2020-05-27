var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/', express.static('public'));
app.use('/admin', require('./admin.js'));
app.use('/media', require('./media.js'));
app.use('/signup', require('./signup.js'));

app.get('/', function(req, res, next){
    res.status(200).render('index');
})


app.get('/login', function(req, res, next){
    res.status(200).render('login');
})


app.get('/search', function(req, res, next){
    res.status(200).render('search');
})

app.get('/userProfile', function(req, res, next){
    res.status(200).render('userProfile');
})

app.get('/friendProfile', function(req, res, next){
    res.status(200).render('friendProfile');
})

app.get('/post', function(req, res, next){
    res.status(200).render('post');
})


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
