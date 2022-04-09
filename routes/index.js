var express = require('express');
var router = express.Router();
var db = 'mongodb+srv://admin:L461kM6sW1WD4q0Z@cluster0.whbjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(err=>{
  console.log("co loi xay ra")
})

var hinhAnh = new mongoose.Schema({
  tieude: 'string',
  noidung: 'string',
  date: 'string',
  linkanh:'string'
})

var database = mongoose.model('ass_locnvph13492', hinhAnh);

router.post('/add', function(req, res){
  var ten = req.body.name;
  var nd = req.body.content;
  var date = req.body.date;
  var link = req.body.link;

  const data = new database({
    tieude: ten,
    noidung: nd,
    date: date,
    linkanh: link
  })

  data.save(function(err){
    if(err == null) {
      res.redirect('/')
    }else {
      res.render('index',{message: err, title: ''})
    }
  });
})

router.get('/json', function (req, res, next){
  database.find({}, function(err, data){
    res.send(data)
  });
})
router.get('/data', function (req, res, next){
  res.send('okokok')
})

/* GET home page. */
router.get('/', function(req, res, next) {
  database.find({}, function(err, data){
    res.render('index', { title: 'home', data: data});
  });
});

router.post('/delete',function(req, res){
  var id = req.body.delete;
 console.log(id)
  database.deleteOne({_id: id},function(err){
    if(err) throw err
      res.redirect('/')
  })
})

router.post('/edit', function (req, res, next) {
  var id = req.body.edit;
  database.find({_id: id}, function (err, data){
    res.render('edit', {title: ' edit',data: data, message:''})
  })
})

router.post('/update', function (req, res){
  var id = req.body.update;
  var ten = req.body.name;
  var nd = req.body.content;
  var date = req.body.date;
  var link = req.body.link;

  database.updateOne({_id:id},{tieude: ten, noidung: nd, date: date, linkanh:link}, function(err){
    if(err) throw err
    res.redirect('/')
  })

})
router.get('/form', function(req, res, next){
  res.render('form', { title: 'Add new', message:''})
})
module.exports = router;
