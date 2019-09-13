var express = require('express');
var router = express.Router();
var directorModel = require('../models/director');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to G-Pop Watch BackEnd' });
});

router.post('/createDirector', function(req, res, next) {

  console.log('req.body', req.body);

  var directorData = {
    directorName : req.body.directorName,
    directorLoca : req.body.directorLoca,
    directorCat : req.body.directorCat,
    directorSubCat : req.body.directorSubCat,
    directorTypePrint : req.body.directorTypePrint,
    directorTypeFilm : req.body.directorTypeFilm,
    directorTypeDop : req.body.directorTypeDop,
    directorSituation : req.body.directorSituation,
    directorContent : req.body.directorContent,
    directorContactEmail : req.body.directorContactEmail,
    directorContactPhone : req.body.directorContactPhone,
    directorLabel : req.body.directorLabel,
    directorReckitt: req.body.directorReckitt,
    directorContacted : req.body.directorContacted,
    directorWebsite : req.body.directorWebsite,
    directorVimeo : req.body.directorVimeo,
    directorInsta : req.body.directorInsta,
    directorVideos : req.body.directorVideos,
  }
  console.log('directorData', directorData);

  directorData.save(
    function (error, director) {
      console.log('INDEX BACK - New director save', director);
      res.json(director);
    });
  });


module.exports = router;
