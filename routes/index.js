var express = require('express');
var router = express.Router();
var directorModel = require('../models/director');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to G-Pop Watch BackEnd' });
});


router.post('/createdirector', function(req, res, next) {

  console.log('req.body', req.body);

  var directorData = new directorModel({
    directorName : req.body.directorName,
    directorLoca : req.body.directorLoca,
    directorCat : req.body.directorCat,
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
  })

  directorData.directorVideos.push({
    videoUrl : req.body.directorVideo1,
    videoSource : 'Youtube'
  })
  directorData.directorVideos.push({
    videoUrl : req.body.directorVideo2,
    videoSource : 'Youtube'
  })
  directorData.directorVideos.push({
    videoUrl : req.body.directorVideo3,
    videoSource : 'Youtube'
  })
  directorData.directorVideos.push({
    videoUrl : req.body.directorVideo4,
    videoSource : 'Youtube'
  })

  var subCatList = req.body.directorSubCat.split(', ')

  for (var i = 0; i < subCatList.length; i++) {
    directorData.directorSubCat.push({
      subCatLabel : subCatList[i]
    })
  }

  console.log('directorData', directorData);

  var https = require('https');

  var options = {
    'method': 'POST',
    'hostname': 'scalr.api.appbase.io',
    'path': '/gpop-data2/_doc',
    'headers': {
      'Authorization': 'Basic TVJ3UjB1MDZDOmMwOTAzZDQ4LTdiYWQtNGE4Zi1hZTdmLWM1YzFlMGI4YmI5YQ==',
      'Content-Type': 'application/json'
    }
  };

  var request = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log('Body', body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var appBaseBody = {
    name : req.body.directorName,
    localisation : req.body.directorLoca,
    category : req.body.directorCat,
    subcategories : subCatList,
    print : req.body.directorTypePrint,
    film : req.body.directorTypeFilm,
    DOP : req.body.directorTypeDop,
    situation : req.body.directorSituation,
    content : req.body.directorContent,
    email : req.body.directorContactEmail,
    phone : req.body.directorContactPhone,
    label : req.body.directorLabel,
    reckitt : req.body.directorReckitt,
    contact : req.body.directorContacted,
    website : req.body.directorWebsite,
    vimeo : req.body.directorVimeo,
    instagram : req.body.directorInsta,
    video1 : req.body.directorVideo1,
    video2 : req.body.directorVideo2,
    video3 : req.body.directorVideo3,
    video4 : req.body.directorVideo4
  }

  var appBaseData = JSON.stringify(appBaseBody)

  request.write(appBaseData);

  request.end();

  directorData.save(
    function (error, director) {
      console.log('CREATE DIRECTOR - director save', director);
      console.log('CREATE DIRECTOR - error', error);
      res.json(director);
    });

  });


router.get('/getdirector', function(req,res,next){

  directorModel.findOne({directorName : req.query.directorName})
  .exec(function(err, director){
    if (director) {
      console.log('GET DIRECTOR - Director trouvé', director);
      res.json(director);
    } else {
      console.log('GET DIRECTOR - walou pas de director');
      res.json(err);
    }
  })

});

router.post('/updatedirector', function(req,res,next){

  directorModel.findOne({directorName : req.body.oldName})
  .exec(function(err, director){
    if (director) {
      console.log('Director trouvé', director);
      // mettre à jour en BDD + dans l'API
      console.log('req.body', req.body);

      director.directorName = req.body.directorName,
      director.directorLoca = req.body.directorLoca,
      director.directorCat = req.body.directorCat,
      director.directorTypePrint = req.body.directorTypePrint,
      director.directorTypeFilm = req.body.directorTypeFilm,
      director.directorTypeDop = req.body.directorTypeDop,
      director.directorSituation = req.body.directorSituation,
      director.directorContent = req.body.directorContent,
      director.directorContactEmail = req.body.directorContactEmail,
      director.directorContactPhone = req.body.directorContactPhone,
      director.directorLabel = req.body.directorLabel,
      director.directorReckitt = req.body.directorReckitt,
      director.directorContacted = req.body.directorContacted,
      director.directorWebsite = req.body.directorWebsite,
      director.directorVimeo = req.body.directorVimeo,
      director.directorInsta = req.body.directorInsta,

      director.directorVideos[0] = {
        videoUrl : req.body.directorVideo1,
        videoSource : 'Youtube'
      }
      director.directorVideos[1] = {
        videoUrl : req.body.directorVideo2,
        videoSource : 'Youtube'
      }
      director.directorVideos[2] = {
        videoUrl : req.body.directorVideo3,
        videoSource : 'Youtube'
      }
      director.directorVideos[3] = {
        videoUrl : req.body.directorVideo4,
        videoSource : 'Youtube'
      }

      var subCatList = req.body.directorSubCat.split(', ')

      for (var i = 0; i < subCatList.length; i++) {
        director.directorSubCat.push({
          subCatLabel : subCatList[i]
        })
      }

      var https = require('https');
      // TODO : Fix la query + lancer la recherche pour récupérer l'ID du director
      var querystring = require('querystring');

      var query = querystring.stringify(
        {
          match : { name : req.body.oldName }
        }
      )

      console.log('query stringified', query);

      var optionsSearch = {
        'method': 'GET',
        'hostname': 'scalr.api.appbase.io',
        'path': `/gpop-data2/_doc/_search?q=${query}`,
        'headers': {
          'Authorization': 'Basic TVJ3UjB1MDZDOmMwOTAzZDQ4LTdiYWQtNGE4Zi1hZTdmLWM1YzFlMGI4YmI5YQ==',
          'Content-Type': 'application/json'
        }
      };

      console.log('optionsSearch', optionsSearch);

      var searchReq = https.request(optionsSearch, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          console.log('Body', body.toString());
        });

        res.on("error", function (error) {
          console.error(error);
        });
      });

      var postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; ------WebKitFormBoundary7MA4YWxkTrZu0gW--";

      // req.setHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');

      searchReq.write(postData);

      searchReq.end();
      //
      // var optionsUpdate = {
      //   'method': 'PUT',
      //   'hostname': 'scalr.api.appbase.io',
      //   'path': '/gpop-data2/_doc/',
      //   'headers': {
      //     'Authorization': 'Basic TVJ3UjB1MDZDOmMwOTAzZDQ4LTdiYWQtNGE4Zi1hZTdmLWM1YzFlMGI4YmI5YQ==',
      //     'Content-Type': 'application/json'
      //   }
      // };
      //
      // var updateReq = https.request(options, function (res) {
      //   var chunks = [];
      //
      //   res.on("data", function (chunk) {
      //     chunks.push(chunk);
      //   });
      //
      //   res.on("end", function (chunk) {
      //     var body = Buffer.concat(chunks);
      //     console.log('Body', body.toString());
      //   });
      //
      //   res.on("error", function (error) {
      //     console.error(error);
      //   });
      // });
      //
      // var appBaseBody = {
      //   name : req.body.directorName,
      //   localisation : req.body.directorLoca,
      //   category : req.body.directorCat,
      //   subcategories : subCatList,
      //   print : req.body.directorTypePrint,
      //   film : req.body.directorTypeFilm,
      //   DOP : req.body.directorTypeDop,
      //   situation : req.body.directorSituation,
      //   content : req.body.directorContent,
      //   email : req.body.directorContactEmail,
      //   phone : req.body.directorContactPhone,
      //   label : req.body.directorLabel,
      //   reckitt : req.body.directorReckitt,
      //   contact : req.body.directorContacted,
      //   website : req.body.directorWebsite,
      //   vimeo : req.body.directorVimeo,
      //   instagram : req.body.directorInsta,
      //   video1 : req.body.directorVideo1,
      //   video2 : req.body.directorVideo2,
      //   video3 : req.body.directorVideo3,
      //   video4 : req.body.directorVideo4
      // }
      //
      // var appBaseData = JSON.stringify(appBaseBody)
      //
      // updateReq.write(appBaseData);
      //
      // updateReq.end();

      director.save(
        function (error, director) {
          console.log('INDEX BACK - Update director save', director);
          console.log('INDEX BACK - Update director error', error);
          res.json(director);
        });
    } else {
      console.log('UPDATE - walou pas de director');
      res.json(err);
    }
  })

});


router.get('/getDirectorsList', function(req,res,next){

  // TODO : trouver un moyen de retourner la liste complète des directors

  var https = require('https');

  var options = {
    'method': 'POST',
    'hostname': 'scalr.api.appbase.io',
    'path': '/gpop-data2/_search?q=*.*',
    'headers': {
      'Authorization': 'Basic TVJ3UjB1MDZDOmMwOTAzZDQ4LTdiYWQtNGE4Zi1hZTdmLWM1YzFlMGI4YmI5YQ=='
    }
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      res.json(body);
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; ------WebKitFormBoundary7MA4YWxkTrZu0gW--";

  // req.setHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');

  req.write(postData);

  req.end();

});


module.exports = router;
